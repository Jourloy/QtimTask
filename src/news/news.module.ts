import {Module} from "@nestjs/common";
import {NewsService} from "./news.service";
import {NewsController} from "./news.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {News} from "./entities/news.entity";
import {UserModule} from "../user/user.module";

@Module({
	imports: [TypeOrmModule.forFeature([News]), UserModule],
	controllers: [NewsController],
	providers: [NewsService],
})
export class NewsModule {}
