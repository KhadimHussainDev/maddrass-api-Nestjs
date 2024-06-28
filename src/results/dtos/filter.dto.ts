import { IsInt, IsOptional, IsString } from 'class-validator';

export class FilterResultDto {
  @IsOptional()
  @IsInt()
  examId?: number;

  @IsOptional()
  @IsInt()
  enrollmentId?: number;
}
