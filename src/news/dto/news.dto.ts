import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class NewsDto {
	@ApiProperty({example: `How to fast lost 20 pounds`, required: true})
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({
		example: `It's very easy, anyone have this, need just...`,
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	description: string;
}
