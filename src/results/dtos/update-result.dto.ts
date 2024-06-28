import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateResultDto {
  @IsOptional()
  @IsInt()
  obtainedMarks?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  examId?: number;

  @IsOptional()
  @IsInt()
  enrollmentId?: number;
}
