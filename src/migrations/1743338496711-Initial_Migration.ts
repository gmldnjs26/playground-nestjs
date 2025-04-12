import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1743338496711 implements MigrationInterface {
  name = 'InitialMigration1743338496711';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_POST_TITLE_AUTHOR_ID" ON "posts" ("title", "author_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_POST_AUTHOR_ID" ON "posts" ("author_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_POST_TITLE" ON "posts" ("title") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_POST_TITLE"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_POST_AUTHOR_ID"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_POST_TITLE_AUTHOR_ID"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
