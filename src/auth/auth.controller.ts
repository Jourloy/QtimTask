import {Body, Controller, Get, Logger, Post, Res, Headers} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {UserDto} from "./dto/user.dto";
import {IReturn} from "../../types";

@Controller(`/auth`)
@ApiTags(`Auth`)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private logger = new Logger(AuthController.name);

	private sendResponse(
		state: {access?: string; refresh?: string} & IReturn,
		response: Response
	) {
		const status = state.error ? 400 : 200;
		response.status(status).json(state);
	}

	@Post(`/register`)
	@ApiOperation({summary: `Create user`})
	@ApiResponse({
		status: 200,
		description: `User successfully created, access and refresh in body`,
	})
	@ApiResponse({status: 400, description: `Error, look into body for get more info`})
	async register(@Body() body: UserDto, @Res() response: Response) {
		const state = await this.authService.register(body);
		this.sendResponse(state, response);
	}

	@Post(`/login`)
	@ApiOperation({summary: `Login user`})
	@ApiResponse({
		status: 200,
		description: `User successfully login, access and refresh in body`,
	})
	@ApiResponse({status: 400, description: `Error, look into body for get more info`})
	async login(@Body() body: UserDto, @Res() response: Response) {
		const state = await this.authService.login(body);
		this.sendResponse(state, response);
	}

	@Get(`/tokens`)
	@ApiOperation({summary: `Auth via tokens`})
	@ApiResponse({
		status: 200,
		description: `Tokens successfully updates, access and refresh in body`,
	})
	@ApiResponse({status: 400, description: `Error, need to generate new tokens`})
	async updateTokens(@Headers() headers, @Res() response: Response) {
		const state = await this.authService.updateTokens(headers[`refresh`]);
		this.sendResponse(state, response);
	}
}
