import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ClazzYearService } from './clazz-year.service';
import { AuthGuard } from '../users/guards/auth.guard';
import { CreateClazzYearDto } from './dtos/create-class-year.dto';
import { UpdateClazzYearDto } from './dtos/update-clazz-year.dto';

@Controller('clazz-year')
@UseGuards(AuthGuard)
export class ClazzYearController {
  constructor(private readonly clazzYearService: ClazzYearService) {}

  @Post()
  async create(@Body() createClazzYearDto: CreateClazzYearDto) {
    try {
      return await this.clazzYearService.create(createClazzYearDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('create-by-clazz-name')
  async createByClazzName(@Body() body: { clazzName: string; year: number }) {
    const { clazzName, year } = body;
    return await this.clazzYearService.createByClazzName(clazzName, year);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const clazzYear = await this.clazzYearService.findOne(id);
    if (!clazzYear) {
      throw new NotFoundException('ClazzYear not found');
    }
    return clazzYear;
  }

  @Get()
  async findAll() {
    return await this.clazzYearService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClazzYearDto: UpdateClazzYearDto,
  ) {
    try {
      return await this.clazzYearService.update(id, updateClazzYearDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.clazzYearService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('year/:year')
  async findByYear(@Param('year', ParseIntPipe) year: number) {
    return await this.clazzYearService.findByYear(year);
  }

  @Put(':id/assign-clazz/:clazzId')
  async assignClazz(
    @Param('id', ParseIntPipe) id: number,
    @Param('clazzId', ParseIntPipe) clazzId: number,
  ) {
    try {
      return await this.clazzYearService.assignClazz(id, clazzId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
