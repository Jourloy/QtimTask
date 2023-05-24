import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {IReturn, IUser} from "../../types";
import crypto from "crypto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	private readonly logger = new Logger(UserService.name);

	public async get(email: string) {
		const user = await this.userRepository
			.createQueryBuilder(`user`)
			.where(`user.email = :email`, {email: email})
			.getOne();
		if (!user) return null;
		return user;
	}

	public async create(props: IUser): Promise<IReturn> {
		const _user = await this.get(props.email);
		if (_user) return {error: true, code: `USER_EXIST`};

		const user = new User();
		user.avatar = `https://avatars.dicebear.com/api/identicon/NewUser.svg`;
		user.email = props.email;
		user.password = crypto.createHash(`sha256`).update(props.password).digest(`hex`);
		user.refreshTokens = [];

		const state = await this.userRepository
			.save(user)
			.catch(e => e)
			.then(() => null);

		if (state) return {error: true, code: `DB_ERROR`, description: state};
		return {error: false, code: `OK`};
	}

	public async login(props: IUser): Promise<IReturn> {
		const user = await this.get(props.email);
		if (!user) return {error: true, code: `USER_NOT_FOUND`};

		const password = crypto.createHash(`sha256`).update(props.password).digest(`hex`);

		if (password !== user.password) return {error: true, code: `PASSWORD_INCORRECT`};
		return {error: false, code: `OK`};
	}

	public async updateTokens(
		oldRefresh: string | null,
		refresh: string,
		email: string
	): Promise<IReturn> {
		const user = await this.get(email);
		if (!user) return {error: true, code: `USER_NOT_FOUND`};

		if (!oldRefresh) {
			user.refreshTokens.push(refresh);
		} else {
			const newTokens: string[] = [];
			for (const token of user.refreshTokens) {
				if (token !== oldRefresh) newTokens.push(token);
				else newTokens.push(refresh);
			}
			user.refreshTokens = newTokens;
		}

		const state = await this.userRepository
			.save(user)
			.catch(e => e)
			.then(() => null);

		if (state) return {error: true, code: `DB_ERROR`, description: state};
		return {error: false, code: `OK`};
	}
}
