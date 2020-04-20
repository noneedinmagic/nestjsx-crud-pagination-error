import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Person } from '@models/entities';

@Injectable()
export class PersonService extends TypeOrmCrudService<Person> {
  constructor(@InjectRepository(Person) repo) {
    super(repo);
  }
}
