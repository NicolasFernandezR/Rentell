import { IsEmail, IsString, Matches, ValidateNested } from "class-validator";
import { CreateAddressDto } from "../../users/dto/create-address.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @Matches(
    /^(?=.*[A-Z]).{6,}$/, 
    {
    message: 'La contraseña debe contener al menos una letra mayúscula y tener más de 5 caracteres',
  })
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
