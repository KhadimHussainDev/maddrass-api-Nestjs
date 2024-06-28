import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Constants } from '../../Constants/Constants';

export class UpdateEnrollmentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  clazzCourseId: number;

  @IsString()
  @IsOptional()
  @IsIn([Constants.REGISTERED, Constants.COMPLETED, Constants.LEFT])
  status: string;
}
