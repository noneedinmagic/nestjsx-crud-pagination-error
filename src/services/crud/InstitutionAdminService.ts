import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InstitutionAdmin } from '@models/entities';

@Injectable()
export class InstitutionAdminService extends TypeOrmCrudService<
  InstitutionAdmin
> {
  constructor(@InjectRepository(InstitutionAdmin) repo) {
    super(repo);
  }
}
