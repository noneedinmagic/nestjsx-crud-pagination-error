import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  TableInheritance,
  ChildEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { Role } from '@models/enums';
import { Person } from './Person.entity';

@Entity()
@TableInheritance({
  column: {
    name: 'role',
    type: 'enum',
    enum: Role,
  },
})
export class PersonRole {
  ////////////////////////////////////////////////////////
  //// Fields
  ////////////////////////////////////////////////////////
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty({
    description: 'Роль',
    example: Role.INSTITUTION_ADMIN,
    enum: Role,
  })
  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
  })
  @Expose()
  readonly role: Role;

  @ApiProperty({
    description: 'ID особи',
    example: 1,
  })
  @Column({
    name: 'person_id',
  })
  @IsNotEmpty()
  @IsInt()
  personId: number;

  ////////////////////////////////////////////////////////
  //// Relations
  ////////////////////////////////////////////////////////
  @ApiProperty({
    description: 'Фізична особа',
    type: () => Person,
  })
  @ManyToOne(() => Person, person => person.roles)
  @JoinColumn({
    name: 'person_id',
  })
  @Type(() => Person)
  person: Person;
}

@ChildEntity(Role.SUPERADMIN)
export class SuperAdmin extends PersonRole {
  ////////////////////////////////////////////////////////
  //// Fields
  ////////////////////////////////////////////////////////
  @ApiProperty({
    description: 'Роль',
    example: Role.SUPERADMIN,
  })
  readonly role: Role;
}

@ChildEntity(Role.INSTITUTION_ADMIN)
export class InstitutionAdmin extends PersonRole {
  ////////////////////////////////////////////////////////
  //// Fields
  ////////////////////////////////////////////////////////
  @ApiProperty({
    description: 'Роль',
    example: Role.INSTITUTION_ADMIN,
  })
  readonly role: Role;

  @ApiProperty({
    description: 'ID ЗВО у ЄДЕБО',
    example: 79,
  })
  @Column({
    name: 'institution_name',
  })
  @IsNotEmpty()
  @IsString()
  institutionName: string;
}
