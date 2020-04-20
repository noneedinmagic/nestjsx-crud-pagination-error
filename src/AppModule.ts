import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as modules from '@modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(),

    ...Object.values(modules),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {
  constructor() {
    console.debug(this.constructor.name + ' constructed');
  }
}
