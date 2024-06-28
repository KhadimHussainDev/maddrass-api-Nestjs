import { IsString } from 'class-validator';

export class CreateClazzDto {
  @IsString()
  name: string;
}
