import { IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  phone: string;
}

