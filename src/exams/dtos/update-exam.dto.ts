import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class UpdateExamDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  totalMarks?: number;

  @IsOptional()
  @IsString()
  date?: string;

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
