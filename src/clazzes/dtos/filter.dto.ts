import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  offset?: number = 0;

  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}
