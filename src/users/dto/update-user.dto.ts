import {OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../common/dtos/create-user.dto';
import { UpdateAddressDto } from './update-adress.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['address'] as const),
) {
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}