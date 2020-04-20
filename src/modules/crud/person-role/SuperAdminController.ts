import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  Override,
  CrudRequest,
  ParsedRequest,
  ParsedBody,
} from '@nestjsx/crud';
import { PersonRole, SuperAdmin } from '@models/entities';
import { SuperAdminService } from '@services';
// import { SuperAdminCreateDto } from '@models/dto';

const resourceName = PersonRole.name;
const controllerRoute = `crud/${resourceName}/${SuperAdmin.name}`;
const swaggerTag = resourceName;

@UseInterceptors(ClassSerializerInterceptor)
@Crud({
  model: {
    type: SuperAdmin,
  },
  dto: {
    // create: SuperAdminCreateDto,
  },
  query: {
    maxLimit: 100,
  },
  routes: {
    only: ['createOneBase'],
    createOneBase: {
      decorators: [
        // UseRoles({
        //   resource: resourceName,
        //   action: CrudAction.CREATE,
        //   possession: CrudPosession.ANY,
        // }),
        // ApiBody({ type: SuperAdminCreateDto }),
        ApiCreatedResponse({ type: SuperAdmin }),
      ],
    },
  },
})
@ApiBearerAuth()
@ApiTags(swaggerTag)
@Controller(controllerRoute)
export class SuperAdminController implements CrudController<SuperAdmin> {
  constructor(readonly service: SuperAdminService) {
    console.debug(this.constructor.name + ' constructed');
  }

  get base(): CrudController<SuperAdmin> {
    return this;
  }

  @Override('createOneBase')
  createOneSuperAdmin(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: SuperAdmin,
  ): Promise<SuperAdmin> {
    return this.base.createOneBase(req, dto);
  }
}
