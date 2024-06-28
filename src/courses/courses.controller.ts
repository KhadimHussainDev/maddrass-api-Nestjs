import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { FilterDto } from './dtos/filter.dto';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('courses')
@UseGuards(AuthGuard)
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post()
  addCourse(@Body() courseDto: CreateCourseDto) {
    return this.coursesService.create(courseDto);
  }

  @Get('/count')
  countCourses(@Query('where') query: string) {
    const filterDto = JSON.parse(query) as FilterDto;

    return this.coursesService.countWithConditions(filterDto);
  }

  @Get()
  getAllCourses(@Query('filter') query: string) {
    const filterDto = JSON.parse(query) as FilterDto;

    return this.coursesService.findWithPagination(filterDto);
  }

  @Get('/:id')
  findCourse(@Param('id') id: string) {
    return this.coursesService.findOne(parseInt(id));
  }

  @Put('/:id')
  updateCourse(@Param('id') id: string, @Body() courseDto: UpdateCourseDto) {
    return this.coursesService.update(parseInt(id), courseDto);
  }

  @Delete('/:id')
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.remove(parseInt(id));
  }
}
