import { IsDateString, IsString } from 'class-validator';

export class TerminationDto {
  @IsString()
  department: string;

  // @IsDateString()
  @IsString()
  terminationDate: string;

  @IsString()
  terminationReason: string;
}
