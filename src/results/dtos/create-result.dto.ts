import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateResultDto {
  @IsNotEmpty()
  @IsInt()
  obtainedMarks: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsInt()
  examId: number;

  @IsNotEmpty()
  @IsInt()
  enrollmentId: number;
}
