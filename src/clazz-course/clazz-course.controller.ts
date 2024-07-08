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
} from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';
import { ClazzCourseService } from './clazz-course.service';
import { CreateClazzCourseDto } from './dtos/create-clazz-course.dto';
import { UpdateClazzCourseDto } from './dtos/update-clazz-course.dto';

@Controller('clazz-course')
@UseGuards(AuthGuard)
export class ClazzCourseController {
  constructor(private readonly clazzCourseService: ClazzCourseService) {}

  @Post()
  async create(@Body() createClazzCourseDto: CreateClazzCourseDto) {
    return this.clazzCourseService.create(createClazzCourseDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClazzCourseDto: UpdateClazzCourseDto,
  ) {
    return this.clazzCourseService.update(id, updateClazzCourseDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clazzCourseService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.clazzCourseService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.clazzCourseService.remove(id);
  }

  @Get('clazz-year/:clazzYearId')
  async findByClazzYear(@Param('clazzYearId', ParseIntPipe) clazzYearId: number) {
    return this.clazzCourseService.findByClazzYear(clazzYearId);
  }

  @Get(':clazzCourseId/exams')
  async findExamsForClazzCourse(
    @Param('clazzCourseId', ParseIntPipe) clazzCourseId: number,
  ) {
    return this.clazzCourseService.findExamsForClazzCourse(clazzCourseId);
  }
}
