import { IsString, IsInt, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExamDto {
  @IsString()
  name: string;

  @IsNumber()
  totalMarks: number;

  @IsString()
  date: string;

  @IsString()
  board: string;

  @IsString()
  type: string;

  @IsNotEmpty()
  @IsInt()
  clazzCourseId: number;
}
