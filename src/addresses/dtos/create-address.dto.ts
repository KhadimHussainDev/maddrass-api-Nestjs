import { IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  type: string;

  @IsString()
  addressText: string;

  @IsString()
  tehsil: string;

  @IsString()
  district: string;
}