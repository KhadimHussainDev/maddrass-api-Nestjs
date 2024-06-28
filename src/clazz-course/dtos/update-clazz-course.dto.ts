import { IsOptional, IsNumber } from 'class-validator';

export class UpdateClazzCourseDto {
  @IsOptional()
  @IsNumber()
  clazzYearId?: number;

  @IsOptional()
  @IsNumber()
  courseId?: number;
}
