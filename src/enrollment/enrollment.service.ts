import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Constants } from '../Constants/Constants';
import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';
import { StudentsService } from '../students/students.service';
import { ClazzCourseService } from '../clazz-course/clazz-course.service';
import { UpdateEnrollmentDto } from './dtos/update-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private repo: Repository<Enrollment>,
    private studentsService: StudentsService,
    private clazzCourseService: ClazzCourseService,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { studentId, clazzCourseId } = createEnrollmentDto;

    const student = await this.studentsService.findOne(studentId);
    if (!student) {
      throw new BadRequestException('Student Not Found with given id');
    }

    const clazzCourse = await this.clazzCourseService.findOne(clazzCourseId);
    if (!clazzCourseId) {
      throw new BadRequestException('ClazzCourse Not Found With given Id');
    }

    const enrollment = this.repo.create();
    enrollment.student = student;
    enrollment.clazzCourse = clazzCourse;

    return this.repo.save(clazzCourse);
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    const enrollment = await this.findOne(id);
    if (!enrollment) {
      throw new BadRequestException('No Enrollment Found!');
    }

    const { studentId, clazzCourseId, status } = updateEnrollmentDto;
    if (studentId) {
      const student = await this.studentsService.findOne(studentId);
      if (!student) {
        throw new BadRequestException('Student Not Found with given id');
      }
      enrollment.student = student;
    }
    if (clazzCourseId) {
      const clazzCourse = await this.clazzCourseService.findOne(clazzCourseId);
      if (!clazzCourseId) {
        throw new BadRequestException('ClazzCourse Not Found With given Id');
      }
      enrollment.clazzCourse = clazzCourse;
    }

    if (status) {
      enrollment.status = status;
    }

    return this.repo.save(enrollment);
  }

  async findOne(id: number): Promise<Enrollment> {
    const enrollment = await this.repo.findOneBy({ id });
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    return enrollment;
  }

  async findAll(): Promise<Enrollment[]> {
    return this.repo.find({
      relations: ['student', 'clazzCourse', 'results'],
    });
  }

  async remove(id: number) {
    const enrollment = await this.findOne(id);
    return this.repo.remove(enrollment);
  }

  async findByStudent(studentId: number): Promise<Enrollment[]> {
    return this.repo.find({
      where: { student: { id: studentId } },
      relations: ['clazzCourse', 'results'],
    });
  }

  async findByClazzCourse(clazzCourseId: number): Promise<Enrollment[]> {
    return this.repo.find({
      where: {
        clazzCourse: { id: clazzCourseId },
        status: Constants.REGISTERED,
      },
      relations: ['student', 'results'],
    });
  }
}
