import { IsOptional, IsNumber } from 'class-validator';

export class UpdateClazzYearDto {
  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsNumber()
  clazzId?: number;
}
