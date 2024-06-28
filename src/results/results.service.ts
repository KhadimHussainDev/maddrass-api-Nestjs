import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/results.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateResultDto } from './dtos/create-result.dto';
import { ExamsService } from '../exams/exams.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { UpdateResultDto } from './dtos/update-result.dto';
import { FilterResultDto } from './dtos/filter.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result) private repo: Repository<Result>,
    private examsService: ExamsService,
    private enrollmentService: EnrollmentService,
  ) {}

  async findOne(id: number): Promise<Result> {
    const result = await this.repo.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`Result #${id} not found`);
    }
    return result;
  }

  async create(createResultDto: CreateResultDto) {
    const { examId, enrollmentId } = createResultDto;

    const exam = await this.examsService.findOne(examId);
    if (!exam) {
      throw new NotFoundException('Exam Not Found');
    }

    const enrollment = await this.enrollmentService.findOne(enrollmentId);
    if (!enrollment) {
      throw new NotFoundException('Enrollment Not Found');
    }
    const result = await this.repo.create(createResultDto);
    result.exam = exam;
    result.enrollment = enrollment;
    return this.repo.save(result);
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('Result Not Found');
    }
    Object.assign(result, updateResultDto);

    const { examId, enrollmentId } = updateResultDto;
    if (examId) {
      const exam = await this.examsService.findOne(examId);
      if (!exam) {
        throw new NotFoundException('Exam Not Found');
      }
      result.exam = exam;
    }
    if (enrollmentId) {
      const enrollment = await this.enrollmentService.findOne(enrollmentId);
      if (!enrollment) {
        throw new NotFoundException('Enrollment Not Found');
      }
      result.enrollment = enrollment;
    }

    return this.repo.save(result);
  }

  async findAll(filterDto: FilterResultDto): Promise<Result[]> {
    const query: FindOptionsWhere<Result> = {};

    if (filterDto.examId !== undefined) {
      query.exam = { id: filterDto.examId };
    }
    if (filterDto.enrollmentId !== undefined) {
      query.enrollment = { id: filterDto.enrollmentId };
    }

    const results = await this.repo.find({
      where: query,
      relations: ['exam', 'enrollment'],
    });
    return results;
  }
  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Result #${id} not found`);
    }
  }
}
