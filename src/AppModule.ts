import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [],
  controllers: [],
})
export class AppModule {
  constructor() {
    console.debug(this.constructor.name + ' constructed');
  }
}
