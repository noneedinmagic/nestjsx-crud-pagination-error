import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  IsInt,
  IsString,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@models/enums';
import { PersonRole, SuperAdmin, InstitutionAdmin } from './PersonRole.entity';

@Entity()
export class Person {
  ////////////////////////////////////////////////////////
  //// Fields
  ////////////////////////////////////////////////////////
  @ApiProperty({
    description: 'ID',
    example: 10,
  })
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty({
    description: 'ПІБ',
    example: 'Іванов Іван Іванович',
  })
  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  ////////////////////////////////////////////////////////
  //// Relations
  ////////////////////////////////////////////////////////
  @ApiProperty({
    description: 'Ролі особи',
    type: () => PersonRole,
    isArray: true,
  })
  @OneToMany(() => PersonRole, role => role.person)
  // TODO: wait to fix this issue: https://github.com/nestjsx/crud/issues/463
  @Type(() => PersonRole, {
    discriminator: {
      property: 'role',
      subTypes: [
        { name: Role.SUPERADMIN, value: SuperAdmin },
        { name: Role.INSTITUTION_ADMIN, value: InstitutionAdmin },
      ],
    },
  })
  roles?: PersonRole[];
}
