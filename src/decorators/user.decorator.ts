import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const locals = context.switchToHttp().getResponse().locals;
		const email = locals.email;
		return {email: email, access: locals.access};
	}
);
