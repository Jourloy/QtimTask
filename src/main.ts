import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import helmet from "helmet";
import pkg from "../package.json";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	const config = new DocumentBuilder()
		.setTitle(`QTIM`)
		.setDescription(`Test task`)
		.setExternalDoc(`Author`, `https://github.com/jourloy`)
		.setVersion(pkg.version)
		.build();
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup(`api`, app, document);

	app.use(helmet());

	await app.listen(3111, `0.0.0.0`);
}

bootstrap().then();
