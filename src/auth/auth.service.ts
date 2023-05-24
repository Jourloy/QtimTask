import {Injectable} from "@nestjs/common";
import {sign, verify} from "jsonwebtoken";
import {UserService} from "../user/user.service";
import {IReturn, IUser} from "../../types";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	/**
	 * Generate access and refresh JWT tokens
	 * @param email
	 * @private
	 */
	private generateTokens(email: string): {access: string; refresh: string} {
		const refresh = sign({email}, process.env.SECRET, {expiresIn: `3d`});
		const access = sign({email}, process.env.SECRET, {expiresIn: `3m`});
		return {refresh, access};
	}

	/**
	 * Update JWT tokens
	 * @param refresh
	 */
	public async updateTokens(
		refresh: string
	): Promise<{access?: string; refresh?: string} & IReturn> {
		try {
			// Try to decode token
			const decoded = verify(refresh, process.env.SECRET);
			const user = await this.userService.get((decoded as {email: string}).email);

			// Check tokens
			if (!user.refreshTokens.includes(refresh)) {
				return {error: true, code: `REFRESH_TOKEN_NOT_VALID`};
			}

			// Generate new tokens
			const {refresh: newRefresh, access: newAccess} = this.generateTokens(
				user.email
			);

			// Update user's token
			const updateState = await this.userService.updateTokens(
				refresh,
				newRefresh,
				user.email
			);
			if (updateState.error) return updateState;

			return {error: false, code: `OK`, refresh: newRefresh, access: newAccess};
		} catch (err) {
			return {error: true, code: `JWT_VERIFY_ERR`, description: err.message};
		}
	}

	/**
	 * Register user in system
	 * @param props
	 */
	public async register(
		props: IUser
	): Promise<{access?: string; refresh?: string} & IReturn> {
		const createState = await this.userService.create(props);

		// If error while create return state
		if (createState.error) return createState;

		// Generate new tokens
		const {refresh: newRefresh, access: newAccess} = this.generateTokens(props.email);

		const user = await this.userService.get(props.email);

		// Update user's token
		const updateState = await this.userService.updateTokens(
			null,
			newRefresh,
			user.email
		);
		if (updateState.error) return updateState;

		// If error while update return state
		if (updateState.error) return updateState;

		return {error: false, code: `OK`, refresh: newRefresh, access: newAccess};
	}

	/**
	 * Login user in system
	 * @param props
	 */
	public async login(
		props: IUser
	): Promise<{access?: string; refresh?: string} & IReturn> {
		const loginState = await this.userService.login(props);

		// If error while login return state
		if (loginState.error) return loginState;

		// Check refresh tokens
		const user = await this.userService.get(props.email);

		// Generate new tokens
		const {refresh: newRefresh, access: newAccess} = this.generateTokens(props.email);

		// Update user's token
		const updateState = await this.userService.updateTokens(
			null,
			newRefresh,
			user.email
		);
		if (updateState.error) return updateState;

		// If error while update return state
		if (updateState.error) return updateState;

		return {error: false, code: `OK`, refresh: newRefresh, access: newAccess};
	}
}
