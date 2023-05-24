import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1684922741070 implements MigrationInterface {
	name = "Initial1684922741070";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL, "refreshTokens" text array NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "authorId" integer, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "news" ADD CONSTRAINT "FK_18ab67e7662dbc5d45dc53a6e00" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "news" DROP CONSTRAINT "FK_18ab67e7662dbc5d45dc53a6e00"`
		);
		await queryRunner.query(`DROP TABLE "news"`);
		await queryRunner.query(`DROP TABLE "user"`);
	}
}
