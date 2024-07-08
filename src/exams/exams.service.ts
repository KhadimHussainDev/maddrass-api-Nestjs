import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entities/exams.entity';
import { Repository } from 'typeorm';
import { FilterExamDto } from './dtos/filter-exam.dto';
import { CreateExamDto } from './dtos/create-exam.dto';
import { ClazzCourseService } from '../clazz-course/clazz-course.service';
import { UpdateExamDto } from './dtos/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam) private repo: Repository<Exam>,
    private clazzCourseService: ClazzCourseService,
  ) {}

  async create(createExamDto: CreateExamDto) {
    const { clazzCourseId } = createExamDto;
    const clazzCourse = await this.clazzCourseService.findOne(clazzCourseId);
    if (!clazzCourse) {
      throw new BadRequestException('ClazzCourse Not Found with given id');
    }

    const exam = await this.repo.create(createExamDto);
    exam.clazzCourse = clazzCourse;
    return this.repo.save(exam);
  }

  async update(id: number, updateExamDto: UpdateExamDto) {
    const exam = await this.findOne(id);
    if (!exam) {
      throw new BadRequestException('Exam Not Found!!');
    }

    Object.assign(exam, updateExamDto);

    const { clazzCourseId } = updateExamDto;
    if (clazzCourseId) {
      const clazzCourse = await this.clazzCourseService.findOne(clazzCourseId);
      if (!clazzCourse) {
        throw new BadRequestException('ClazzCourse Not Found with given id');
      }
      exam.clazzCourse = clazzCourse;
    }

    return this.repo.save(exam);
  }

  async findOne(id: number): Promise<Exam> {
    const exam = await this.repo.findOneBy({ id });
    if (!exam) {
      throw new NotFoundException(`Exam #${id} not found`);
    }
    return exam;
  }

  async findAll(filterDto: FilterExamDto): Promise<Exam[]> {
    const exams = await this.repo.find({
      where: filterDto,
      relations: ['results', 'clazzCourse'],
    });
    return exams;
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Exam #${id} not found`);
    }
  }

  async findExamsByClazzCourse(clazzCourseId: number): Promise<Exam[]> {
    return await this.repo.find({
      where: { clazzCourse: { id: clazzCourseId } },
      relations: ['results'],
    });
  }
}
