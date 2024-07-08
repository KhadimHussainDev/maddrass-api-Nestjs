import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admission } from './entities/admissions.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateAdmissionDto } from './dtos/create-admission.dto';
import { Student } from '../students/entities/students.entity';
import { TerminationDto } from './dtos/termination.dto';
import { Constants } from '../Constants/Constants';

@Injectable()
export class AdmissionsService {
  constructor(
    @InjectRepository(Admission) private repo: Repository<Admission>,
  ) {}

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }
  async create(
    admission: CreateAdmissionDto,
    student: Student,
    manager?: EntityManager,
  ) {
    const admissionObj = this.repo.create(admission);
    admissionObj.student = student;
    const repository = manager ? manager.getRepository(Admission) : this.repo;
    return repository.save(admissionObj);
  }

  async update(admission: Admission, attrs: Partial<Admission>) {
    // const admission = await this.findOne(id);

    if (!admission) {
      throw new BadRequestException('Admission Not Found!');
    }

    Object.assign(admission, attrs);

    return this.repo.save(admission);
  }

  async remove(id: number) {
    const admission = await this.findOne(id);

    if (!admission) {
      throw new BadRequestException('Admission Not Found!');
    }

    return this.repo.remove(admission);
  }

  async getAdmissionByStudentId(studentId: number) {
    if (!studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.repo.find({
      where: { student: { id: studentId } },
    });
  }

  async getAdmissions(studentId: number) {
    if (!studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.repo.find({
      where: { student: { id: studentId } },
      order: { admissionDate: 'DESC', terminationDate: 'DESC' },
    });
  }

  private async findLatestAdmission(studentId: number) {
    if (!studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.repo.findOne({
      where: { student: { id: studentId } },
      order: { admissionDate: 'DESC', terminationDate: 'DESC' },
    });
  }

  async terminate(studentId: number, terminationDto: TerminationDto) {
    if (!studentId) {
      throw new BadRequestException('Student ID is required');
    }

    const admission = await this.findLatestAdmission(studentId);
    if (admission && admission.department === terminationDto.department) {
      // Object.assign(admission, terminationDto);
      return this.update(admission, terminationDto);
    } else {
      throw new BadRequestException(Constants.TERMINATION_FAILED);
    }
  }
}
