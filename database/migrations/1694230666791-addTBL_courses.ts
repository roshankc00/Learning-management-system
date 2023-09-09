import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLCourses1694230666791 implements MigrationInterface {
    name = 'AddTBLCourses1694230666791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(500) NOT NULL, "description" character varying(500) NOT NULL, "caption" character varying(500) NOT NULL, "isPublished" boolean NOT NULL DEFAULT false, "price" integer NOT NULL, "language" character varying(500) NOT NULL, "discount" integer NOT NULL, "thumbnail" character varying(500) NOT NULL, "publicId" character varying(500) NOT NULL, "approved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addedById" uuid, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_0efc0fc3bcae60b3b3221157d87" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_0efc0fc3bcae60b3b3221157d87"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
