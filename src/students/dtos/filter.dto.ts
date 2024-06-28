import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FilterDto {
  constructor(partial: Partial<FilterDto>) {
    Object.assign(this, partial);
  }
  @IsOptional()
  @IsNumber()
  pageIndex?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortType?: string;
}
