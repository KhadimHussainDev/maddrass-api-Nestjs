import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClazzCourseDto {
  @IsNotEmpty()
  @IsNumber()
  clazzYearId: number;  

  @IsNotEmpty()
  @IsNumber()
  courseId: number;  
}
