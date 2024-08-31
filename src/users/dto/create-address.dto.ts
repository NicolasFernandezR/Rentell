import { IsString} from "class-validator";

export class CreateAddressDto {
  @IsString()
  calle: string;
  @IsString()
  numero: string;
  @IsString()
  ciudad: string;
  @IsString()
  comuna: string;
  @IsString()
  region: string;
  @IsString()
  pais: string;
}
