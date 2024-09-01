import { IsNumber, IsPositive, IsString } from "class-validator";


export class CreatePropertyDto {
  @IsString()
  address: string;
  @IsString()
  ciudad: string;
  @IsString()
  comuna: string;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsString()
  description: string;
  @IsNumber()
  @IsPositive()
  bathrooms: number;
  @IsNumber()
  @IsPositive()
  rooms: number;
  @IsNumber()
  @IsPositive()
  area: number;
  @IsString()
  photo_url: string;
  @IsString()
  sale_type: string;
  @IsString()
  property_type: string;
}
