import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PersonRole } from '@models/entities';

@Injectable()
export class PersonRoleService extends TypeOrmCrudService<PersonRole> {
  constructor(@InjectRepository(PersonRole) repo) {
    super(repo);
  }
}
