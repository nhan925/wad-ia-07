import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedData1733400100000 implements MigrationInterface {
  name = 'SeedData1733400100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Hash passwords for seed users
    const password1 = await bcrypt.hash('Admin@123', 10);
    const password2 = await bcrypt.hash('User@123', 10);
    const password3 = await bcrypt.hash('Test@123', 10);

    // Insert seed users
    await queryRunner.query(`
      INSERT INTO "users" ("name", "email", "password")
      VALUES
        ('Admin User', 'admin@example.com', '${password1}'),
        ('Test User', 'test@example.com', '${password2}'),
        ('John Doe', 'john@example.com', '${password3}')
      ON CONFLICT ("email") DO NOTHING
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove seed users
    await queryRunner.query(`
      DELETE FROM "users"
      WHERE "email" IN ('admin@example.com', 'test@example.com', 'john@example.com')
    `);
  }
}
