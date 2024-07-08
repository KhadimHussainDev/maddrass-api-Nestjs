import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FilterDto {
  constructor(partial: Partial<FilterDto>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  pageIndex?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sortType?: string;
}
