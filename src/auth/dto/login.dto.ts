import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[A-Z]).{6,}$/, 
    {
    message: 'La contraseña debe contener al menos una letra mayúscula y tener más de 5 caracteres',
  })
  password: string;
}