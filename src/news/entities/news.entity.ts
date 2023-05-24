import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity()
export class News {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@ManyToOne(() => User, user => user.news)
	author: User;
}
