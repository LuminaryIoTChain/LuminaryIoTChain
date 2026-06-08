import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDevices1730100000000 implements MigrationInterface {
  name = "InitialDevices1730100000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "devices" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "tenantId" uuid,
        "externalUserId" varchar(255),
        "name" varchar NOT NULL,
        "protocol" varchar(20) NOT NULL DEFAULT 'mqtt',
        "status" varchar(20) NOT NULL DEFAULT 'offline',
        "metadata" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "devices"`);
  }
}
