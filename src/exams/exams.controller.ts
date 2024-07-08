import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dtos/create-exam.dto';
import { UpdateExamDto } from './dtos/update-exam.dto';
import { FilterExamDto } from './dtos/filter-exam.dto';

@Controller('exams')
@UseGuards(AuthGuard)
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  async create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.examsService.update(id, updateExamDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.findOne(id);
  }

  @Get()
  async findAll(@Query() filterDto: FilterExamDto) {
    return this.examsService.findAll(filterDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.remove(id);
  }

  @Get('clazz-course/:clazzCourseId')
  async findExamsByClazzCourse(
    @Param('clazzCourseId', ParseIntPipe) clazzCourseId: number,
  ) {
    return this.examsService.findExamsByClazzCourse(clazzCourseId);
  }
}
