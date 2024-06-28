import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dtos/create-address.dto';
import { CreateAdmissionDto } from '../../admissions/dtos/create-admission.dto';
import { CreateContactDto } from '../../contacts/dtos/create-contact.dto';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  fatherName: string;

  @IsString()
  @IsOptional()
  fatherCnic: string;

  @IsString()
  @IsOptional()
  guardianName: string;

  @IsString()
  @IsOptional()
  guardianCnic: string;

  @IsString()
  @IsOptional()
  bloodGroup: string;

  @IsString()
  @IsOptional()
  qualification: string;

  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsArray()
  @IsOptional()
  addresses: [];

  @IsArray()
  @IsOptional()
  contacts: [];

  @IsArray()
  @IsOptional()
  admissions: [];
}