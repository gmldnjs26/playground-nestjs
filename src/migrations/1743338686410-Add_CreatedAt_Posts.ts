import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtPosts1743338686410 implements MigrationInterface {
  name = 'AddCreatedAtPosts1743338686410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_at"`);
  }
}
