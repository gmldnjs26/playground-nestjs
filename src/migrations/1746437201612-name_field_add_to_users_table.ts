import { MigrationInterface, QueryRunner } from 'typeorm';

export class NameFieldAddToUsersTable1746437201612
  implements MigrationInterface
{
  name = 'NameFieldAddToUsersTable1746437201612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying(255) DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }
}
