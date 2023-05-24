export interface IReturn {
	error: boolean;
	code: string;
	description?: string;
}

export interface IUser {
	email: string;
	password: string;
}

export interface ICurrentUser {
	email: string;
}
