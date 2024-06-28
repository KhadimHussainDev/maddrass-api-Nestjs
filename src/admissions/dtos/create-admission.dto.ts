import { IsNumber, IsString } from 'class-validator';

export class CreateAdmissionDto {
  @IsString()
  admissionDate: string;

  @IsString()
  department: string;

  @IsNumber()
  admissionFee: number;

  @IsString()
  receiptNumber: string;

  @IsString()
  bookNumber: string;

  @IsString()
  terminationDate: string;

  @IsString()
  terminationReason: string;
}
