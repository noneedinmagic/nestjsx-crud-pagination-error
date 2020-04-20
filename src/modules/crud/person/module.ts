import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './controller';
import { Person } from '@models/entities';
import { PersonService } from '@services';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonCrudModule {
  constructor() {
    console.debug(this.constructor.name + ' constructed');
  }
}
