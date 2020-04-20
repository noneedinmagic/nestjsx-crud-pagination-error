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
import { PersonRole, InstitutionAdmin } from '@models/entities';
import { InstitutionAdminService } from '@services';
// import { InstitutionAdminCreateDto } from '@models/dto';

const resourceName = PersonRole.name;
const controllerRoute = `crud/${resourceName}/${InstitutionAdmin.name}`;
const swaggerTag = resourceName;

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(AppGuard)
@Crud({
  model: {
    type: InstitutionAdmin,
  },
  dto: {
    // create: InstitutionAdminCreateDto,
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
        // ApiBody({ type: InstitutionAdminCreateDto }),
        ApiCreatedResponse({ type: InstitutionAdmin }),
      ],
    },
  },
})
@ApiBearerAuth()
@ApiTags(swaggerTag)
@Controller(controllerRoute)
export class InstitutionAdminController
  implements CrudController<InstitutionAdmin> {
  constructor(readonly service: InstitutionAdminService) {
    console.debug(this.constructor.name + ' constructed');
  }

  get base(): CrudController<InstitutionAdmin> {
    return this;
  }

  @Override('createOneBase')
  createOneInstitutionAdmin(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: InstitutionAdmin,
  ): Promise<InstitutionAdmin> {
    return this.base.createOneBase(req, dto);
  }
}
