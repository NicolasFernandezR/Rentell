import { IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  phone: string;
  @IsString()
  role: string;
  @
  ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
