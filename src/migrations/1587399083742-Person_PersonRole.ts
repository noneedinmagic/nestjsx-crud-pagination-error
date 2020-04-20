import {MigrationInterface, QueryRunner} from "typeorm";

export class PersonPersonRole1587399083742 implements MigrationInterface {
    name = 'PersonPersonRole1587399083742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `person_role` (`id` int NOT NULL AUTO_INCREMENT, `role` enum ('SUPERADMIN', 'INSTITUTION_ADMIN', 'STUDENT', 'EMPLOYEE') NOT NULL, `person_id` int NOT NULL, `institution_name` varchar(255) NULL, INDEX `IDX_b63166e260f6ff5c706dd57f28` (`role`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `person` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `person_role` ADD CONSTRAINT `FK_7770d2f45811631494ac869bbe7` FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `person_role` DROP FOREIGN KEY `FK_7770d2f45811631494ac869bbe7`", undefined);
        await queryRunner.query("DROP TABLE `person`", undefined);
        await queryRunner.query("DROP INDEX `IDX_b63166e260f6ff5c706dd57f28` ON `person_role`", undefined);
        await queryRunner.query("DROP TABLE `person_role`", undefined);
    }

}
