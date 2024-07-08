import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dtos/create-address.dto';
import { CreateAdmissionDto } from '../../admissions/dtos/create-admission.dto';
import { CreateContactDto } from '../../contacts/dtos/create-contact.dto';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsOptional()
  type: string;

  @IsString()
  cnic: string;

  @IsString()
  fatherName: string;

  @IsString()
  fatherCnic: string;

  @IsOptional()
  guardianName: string;

  @IsOptional()
  guardianCnic: string;

  @IsString()
  bloodGroup: string;

  @IsString()
  qualification: string;

  @IsString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsArray()
  addresses: CreateAddressDto[];

  @IsArray()
  contacts: CreateContactDto[];

  @IsOptional()
  @IsArray()
  admissions: CreateAdmissionDto[];
}
