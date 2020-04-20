import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Person } from '@models/entities';
import { PersonService } from '@services';

const resourceName = Person.name;
const controllerRoute = `crud/${resourceName}`;
const swaggerTag = Person.name;

@UseInterceptors(ClassSerializerInterceptor)
@Crud({
  model: {
    type: Person,
  },
  // dto: {
  //   create: PersonCreateDto,
  //   update: PersonUpdateDto,
  // },
  query: {
    maxLimit: 100,
    join: {
      roles: {},
      employees: {},
      students: {},
      users: {},
    },
  },
  routes: {
    getOneBase: {
      decorators: [
        // UseRoles({
        //   resource: resourceName,
        //   action: CrudAction.READ,
        //   possession: CrudPosession.ANY,
        // }),
      ],
    },
    getManyBase: {
      decorators: [
        // UseRoles({
        //   resource: resourceName,
        //   action: CrudAction.READ,
        //   possession: CrudPosession.ANY,
        // }),
      ],
    },
    createOneBase: {
      decorators: [
        // UseRoles({
        //   resource: resourceName,
        //   action: CrudAction.CREATE,
        //   possession: CrudPosession.ANY,
        // }),
      ],
    },
    createManyBase: {
      decorators: [
        // UseRoles({
        //   resource: resourceName,
        //   action: CrudAction.CREATE,
        //   possession: CrudPosession.ANY,
        // }),
      ],
    },
    replaceOneBase: {
      decorators: [
        // UseRoles({
        //   resource: resourceName,
        //   action: CrudAction.UPDATE,
        //   possession: CrudPosession.ANY,
        // }),
      ],
    },
    updateOneBase: {
      decorators: [
        // UseRoles({
        //   resource: resourceName,
        //   action: CrudAction.UPDATE,
        //   possession: CrudPosession.ANY,
        // }),
      ],
    },
    deleteOneBase: {
      decorators: [
        // UseRoles({
        //   resource: resourceName,
        //   action: CrudAction.DELETE,
        //   possession: CrudPosession.ANY,
        // }),
      ],
    },
  },
})
// @CrudAccess()
@ApiBearerAuth()
@ApiTags(swaggerTag)
@Controller(controllerRoute)
export class PersonController implements CrudController<Person> {
  constructor(readonly service: PersonService) {
    console.debug(this.constructor.name + ' constructed');
  }
}
