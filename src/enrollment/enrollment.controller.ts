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
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dtos/update-enrollment.dto';

@Controller('enrollment')
@UseGuards(AuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(id, updateEnrollmentDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.enrollmentService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentService.remove(id);
  }

  @Get('student/:studentId')
  async findByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.enrollmentService.findByStudent(studentId);
  }

  @Get('clazz-course/:clazzCourseId')
  async findByClazzCourse(
    @Param('clazzCourseId', ParseIntPipe) clazzCourseId: number,
  ) {
    return this.enrollmentService.findByClazzCourse(clazzCourseId);
  }
}
