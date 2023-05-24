import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
	Res,
	UseGuards,
} from "@nestjs/common";
import {NewsService} from "./news.service";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {NewsDto} from "./dto/news.dto";
import {CurrentUser} from "../decorators/user.decorator";
import {ICurrentUser} from "../../types";
import {JwtGuard} from "../guards/jwt.guard";

@Controller(`/news`)
@ApiTags(`News`)
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Post(`/create`)
	@UseGuards(JwtGuard)
	@ApiOperation({summary: `Create news`})
	@ApiResponse({
		status: 200,
		description: `News successfully created`,
	})
	@ApiResponse({status: 400, description: `Error, look into body for get more info`})
	async createNews(
		@Body() body: NewsDto,
		@CurrentUser() user: ICurrentUser,
		@Res() response: Response
	) {
		const state = await this.newsService.create(body, user.email);
		const status = state.error ? 400 : 200;
		response.status(status).json(state);
	}

	@Post(`/update/:id`)
	@UseGuards(JwtGuard)
	@ApiOperation({summary: `Update news`})
	@ApiResponse({
		status: 200,
		description: `News successfully updated`,
	})
	@ApiResponse({status: 400, description: `Error, look into body for get more info`})
	async updateNews(
		@Param(`id`, ParseIntPipe) id: number,
		@Body() body: NewsDto,
		@CurrentUser() user: ICurrentUser,
		@Res() response: Response
	) {
		const state = await this.newsService.update(id, body, user.email);
		const status = state.error ? 400 : 200;
		response.status(status).json(state);
	}

	@Post(`/remove/:id`)
	@UseGuards(JwtGuard)
	@ApiOperation({summary: `Remove news`})
	@ApiResponse({
		status: 200,
		description: `News successfully removed`,
	})
	@ApiResponse({status: 400, description: `Error, look into body for get more info`})
	async removeNews(
		@Param(`id`, ParseIntPipe) id: number,
		@CurrentUser() user: ICurrentUser,
		@Res() response: Response
	) {
		const state = await this.newsService.remove(id, user.email);
		const status = state.error ? 400 : 200;
		response.status(status).json(state);
	}

	@Get(`/`)
	@ApiOperation({summary: `Get 20 news`})
	@ApiParam({name: `page`, required: true, example: 2})
	@ApiResponse({
		status: 200,
		description: `Here you never get not 200 status, maybe only empty array`,
	})
	async getNews(@Query() query: {page: string}, @Res() response: Response) {
		const state = await this.newsService.get(+query.page);
		response.status(200).json(state);
	}
}
