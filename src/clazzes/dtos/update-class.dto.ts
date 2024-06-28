import { IsOptional, IsString } from 'class-validator';

export class UpdateClazzDto {
  @IsString()
  @IsOptional()
  name: string;
}
