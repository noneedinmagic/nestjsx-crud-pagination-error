import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { PersonRole } from '@models/entities';
import { PersonRoleService } from '@services';

const resourceName = PersonRole.name;
const controllerRoute = `crud/${resourceName}`;
const swaggerTag = resourceName;

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(AppGuard)
@Crud({
  model: {
    type: PersonRole,
  },
  // dto: {
  //   create: PersonRoleCreateDto,
  //   update: PersonRoleUpdateDto,
  // },
  query: {
    maxLimit: 100,
    join: {
      person: {},
    },
  },
  routes: {
    exclude: [
      'createOneBase',
      'createManyBase',
      'replaceOneBase',
      'updateOneBase',
    ],
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
    // createOneBase: {
    //   decorators: [
    //     UseRoles({
    //       resource: resourceName,
    //       action: CrudAction.CREATE,
    //       possession: CrudPosession.ANY,
    //     }),
    //   ],
    // },
    // createManyBase: {
    //   decorators: [
    //     UseRoles({
    //       resource: resourceName,
    //       action: CrudAction.CREATE,
    //       possession: CrudPosession.ANY,
    //     }),
    //   ],
    // },
    // replaceOneBase: {
    //   decorators: [
    //     UseRoles({
    //       resource: resourceName,
    //       action: CrudAction.UPDATE,
    //       possession: CrudPosession.ANY,
    //     }),
    //   ],
    // },
    // updateOneBase: {
    //   decorators: [
    //     UseRoles({
    //       resource: resourceName,
    //       action: CrudAction.UPDATE,
    //       possession: CrudPosession.ANY,
    //     }),
    //   ],
    // },
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
export class PersonRoleController implements CrudController<PersonRole> {
  constructor(readonly service: PersonRoleService) {
    console.debug(this.constructor.name + ' constructed');
  }
}
