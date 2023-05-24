import {DataSource} from "typeorm";
import {ConfigService} from "@nestjs/config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();

const configService = new ConfigService();

export default new DataSource({
	type: `postgres`,
	host: configService.get(`PG_HOST`),
	port: +configService.get(`PG_PORT`),
	username: configService.get(`PG_USERNAME`),
	password: configService.get(`PG_PASSWORD`),
	database: configService.get(`PG_DATABASE`),
	entities: [__dirname + `/**/*.entity{.ts,.js}`],
	migrations: [__dirname + `/migrations/**/*{.ts,.js}`],
});
