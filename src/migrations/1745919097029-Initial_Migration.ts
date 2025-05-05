import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1745919097029 implements MigrationInterface {
  name = 'InitialMigration1745919097029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "destination" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "location" character varying(255) NOT NULL, CONSTRAINT "PK_e45b5ee5788eb3c7f0ae41746e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bucket_list_item" ("id" SERIAL NOT NULL, "achieved" boolean NOT NULL DEFAULT false, "bucketListId" integer, "destinationId" integer, CONSTRAINT "PK_cfd3dccea762c3a2338bf5a3553" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bucket_list" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "userId" uuid, CONSTRAINT "PK_3e1adf16ee3533ae56db24a826e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "refreshToken" character varying(255), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bucket_list_item" ADD CONSTRAINT "FK_f89ccaea9cc3d3a2a34247647a0" FOREIGN KEY ("bucketListId") REFERENCES "bucket_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bucket_list_item" ADD CONSTRAINT "FK_9a93657cc1b7d1a330c14948fb3" FOREIGN KEY ("destinationId") REFERENCES "destination"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bucket_list" ADD CONSTRAINT "FK_716af414e9ca1d1f604dbd91561" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bucket_list" DROP CONSTRAINT "FK_716af414e9ca1d1f604dbd91561"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bucket_list_item" DROP CONSTRAINT "FK_9a93657cc1b7d1a330c14948fb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bucket_list_item" DROP CONSTRAINT "FK_f89ccaea9cc3d3a2a34247647a0"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "bucket_list"`);
    await queryRunner.query(`DROP TABLE "bucket_list_item"`);
    await queryRunner.query(`DROP TABLE "destination"`);
  }
}
