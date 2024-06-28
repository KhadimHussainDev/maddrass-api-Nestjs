import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class UpdateExamDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  totalMarks?: number;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  board?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  clazzCourseId?: number;
}
