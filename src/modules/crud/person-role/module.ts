import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRoleController } from './PersonRoleController';
import { SuperAdminController } from './SuperAdminController';
import { InstitutionAdminController } from './InstitutionAdminController';
import { PersonRole, SuperAdmin, InstitutionAdmin } from '@models/entities';
import {
  PersonRoleService,
  SuperAdminService,
  InstitutionAdminService,
} from '@services';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonRole, SuperAdmin, InstitutionAdmin]),
  ],
  providers: [PersonRoleService, SuperAdminService, InstitutionAdminService],
  controllers: [
    PersonRoleController,
    SuperAdminController,
    InstitutionAdminController,
  ],
})
export class PersonRoleCrudModule {
  constructor() {
    console.debug(this.constructor.name + ' constructed');
  }
}
