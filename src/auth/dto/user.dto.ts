import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class UserDto {
	@ApiProperty({example: `jourloy@yandex.ru`, required: true})
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty({example: `qwerty321`, required: true})
	@IsNotEmpty()
	@IsString()
	password: string;
}
