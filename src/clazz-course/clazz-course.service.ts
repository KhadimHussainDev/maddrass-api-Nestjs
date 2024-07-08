import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClazzCourse } from './entities/clazz-course.entity';
import { Repository } from 'typeorm';
import { CreateClazzCourseDto } from './dtos/create-clazz-course.dto';
import { CoursesService } from '../courses/courses.service';
import { UpdateClazzCourseDto } from './dtos/update-clazz-course.dto';
import { ClazzYearService } from '../clazz-year/clazz-year.service';

@Injectable()
export class ClazzCourseService {
  constructor(
    @InjectRepository(ClazzCourse) private repo: Repository<ClazzCourse>,
    private clazzYearService: ClazzYearService,
    private coursesService: CoursesService,
  ) {}

  async create(createClazzCourseDto: CreateClazzCourseDto) {
    const { clazzYearId, courseId } = createClazzCourseDto;
    const clazzYear = await this.clazzYearService.findOne(clazzYearId);
    if (!clazzYear) {
      throw new BadRequestException('ClazzYear Not Found!!');
    }

    const course = await this.coursesService.findOne(courseId);
    if (!course) {
      throw new BadRequestException('Course Not Found!!');
    }

    const clazzCourse = this.repo.create();
    clazzCourse.clazzYear = clazzYear;
    clazzCourse.course = course;

    return this.repo.save(clazzCourse);
  }

  async findOne(id: number) {
    const clazzCourse = await this.repo.findOne({
      where: { id },
      relations: ['course', 'clazzYear'],
    });
    if (!clazzCourse) {
      throw new NotFoundException(`ClazzCourse with ID ${id} not found`);
    }

    return clazzCourse;
  }

  async findAll() {
    return this.repo.find({
      relations: ['course', 'clazzYear'],
    });
  }

  async update(id: number, updateClazzCourseDto: UpdateClazzCourseDto) {
    const clazzCourse = await this.findOne(id);
    if (!clazzCourse) {
      throw new NotFoundException(`ClazzCourse with ID ${id} not found`);
    }

    const { clazzYearId, courseId } = updateClazzCourseDto;

    if (clazzYearId) {
      const clazzYear = await this.clazzYearService.findOne(clazzYearId);
      if (!clazzYear) {
        throw new BadRequestException('ClazzYear Not Found!!');
      }
      clazzCourse.clazzYear = clazzYear;
    }

    if (courseId) {
      const course = await this.coursesService.findOne(courseId);
      if (!course) {
        throw new BadRequestException('Course Not Found!!');
      }
      clazzCourse.course = course;
    }

    return this.repo.save(clazzCourse);
  }

  async remove(id: number) {
    const clazzCourse = await this.findOne(id);
    return this.repo.remove(clazzCourse);
  }

  async findByClazzYear(clazzId: number): Promise<ClazzCourse[]> {
    return this.repo.find({
      where: { clazzYear: { id: clazzId } },
      relations: ['course', 'clazzYear'],
    });
  }

  async findExamsForClazzCourse(clazzCourseId: number) {
    const clazzCourse = await this.repo.findOne({
      where: { id: clazzCourseId },
      relations: ['exams'],
    });
    return clazzCourse.exams;
  }
}
