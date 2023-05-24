import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {News} from "./entities/news.entity";
import {Repository} from "typeorm";
import {IReturn} from "../../types";
import {UserService} from "../user/user.service";

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(News)
		private newsRepository: Repository<News>,
		private userService: UserService
	) {}

	/**
	 * Return 1 news by ID
	 * @param id
	 * @param email
	 * @private
	 */
	private getOne(id: number, email: string) {
		return this.newsRepository
			.createQueryBuilder(`news`)
			.leftJoinAndSelect(`news.user`, `user`)
			.where(`news.id = :id`, {id: id})
			.andWhere(`user.email = :email`, {email: email})
			.getOne();
	}

	/**
	 * Return 20 news
	 * @param page
	 */
	public async get(page: number): Promise<{data: News[]} & IReturn> {
		const news = await this.newsRepository
			.createQueryBuilder(`news`)
			.offset(page * 20 - 20)
			.take(20)
			.getMany();

		return {error: false, code: `OK`, data: news};
	}

	/**
	 * Create news entity
	 * @param props
	 * @param email
	 */
	public async create(props: INews, email: string): Promise<IReturn> {
		const author = await this.userService.get(email);
		if (!author) return {error: true, code: `USER_NOT_FOUND`};

		const news = this.newsRepository.create({...props, author: author});
		const state = await this.newsRepository
			.save(news)
			.catch(e => e)
			.then(() => null);

		if (state) return {error: true, code: `DB_ERROR`, description: state};
		return {error: false, code: `OK`};
	}

	/**
	 * Update news entity
	 * @param id
	 * @param update
	 * @param email
	 */
	public async update(id: number, update: INews, email): Promise<IReturn> {
		let news = await this.getOne(id, email);
		if (!news) return {error: true, code: `NEWS_NOT_FOUND`};

		news = Object.assign(news, update);

		const state = await this.newsRepository
			.save(news)
			.catch(e => e)
			.then(() => null);

		if (state) return {error: true, code: `DB_ERROR`, description: state};
		return {error: false, code: `OK`};
	}

	/**
	 * Remove news from database
	 * @param id
	 * @param email
	 */
	public async remove(id: number, email: string): Promise<IReturn> {
		let news = await this.getOne(id, email);
		if (!news) return {error: true, code: `NEWS_NOT_FOUND`};

		const state = await this.newsRepository
			.softRemove(news)
			.catch(e => e)
			.then(() => null);

		if (state) return {error: true, code: `DB_ERROR`, description: state};
		return {error: false, code: `OK`};
	}
}

interface INews {
	title: string;
	description: string;
}
