import { IsString, IsOptional, IsDate, IsInt } from 'class-validator';

export class FilterExamDto {
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
  clazzCourseId?: number; }
