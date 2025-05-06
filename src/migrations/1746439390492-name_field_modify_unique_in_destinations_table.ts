import { MigrationInterface, QueryRunner } from 'typeorm';

export class NameFieldModifyUniqueInDestinationsTable1746439390492
  implements MigrationInterface
{
  name = 'NameFieldModifyUniqueInDestinationsTable1746439390492';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "destination" ADD CONSTRAINT "UQ_8a962921d15e2f4cfa8eba67482" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "destination" DROP CONSTRAINT "UQ_8a962921d15e2f4cfa8eba67482"`,
    );
  }
}
