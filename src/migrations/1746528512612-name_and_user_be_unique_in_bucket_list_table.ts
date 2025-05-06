import { MigrationInterface, QueryRunner } from 'typeorm';

export class NameAndUserBeUniqueInBucketListTable1746528512612
  implements MigrationInterface
{
  name = 'NameAndUserBeUniqueInBucketListTable1746528512612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c83cfee225e68762436f5061a8" ON "bucket_list" ("name", "userId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c83cfee225e68762436f5061a8"`,
    );
  }
}
