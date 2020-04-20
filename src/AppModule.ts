import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {
  constructor() {
    console.debug(this.constructor.name + ' constructed');
  }
}
