import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClazzYearDto {
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  clazzId: number;
}
