import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLUsers1693984352165 implements MigrationInterface {
    name = 'AddTBLUsers1693984352165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "firstName" character varying(500) NOT NULL, "lastName" character varying(500) NOT NULL, "phone" character varying(500) NOT NULL, "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{user}', "gender" "public"."users_gender_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    }

}
