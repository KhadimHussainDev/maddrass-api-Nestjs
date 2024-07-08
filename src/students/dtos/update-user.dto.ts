import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dtos/create-address.dto';
import { CreateAdmissionDto } from '../../admissions/dtos/create-admission.dto';
import { CreateContactDto } from '../../contacts/dtos/create-contact.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fatherName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fatherCnic: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  guardianName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  guardianCnic: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bloodGroup: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  qualification: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  addresses: CreateAddressDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  contacts: CreateContactDto[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  admissions: CreateAdmissionDto[];
}