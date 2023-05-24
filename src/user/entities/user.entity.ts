import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {News} from "../../news/entities/news.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	avatar: string;

	@Column(`text`, {array: true})
	refreshTokens: string[];

	@OneToMany(() => News, news => news.author)
	news?: News[];
}
