import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/students.entity';
import { Brackets, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';
import { AdmissionsService } from '../admissions/admissions.service';
import { ContactsService } from '../contacts/contacts.service';
import { AddressesService } from '../addresses/addresses.service';
import { TerminationDto } from '../admissions/dtos/termination.dto';
import { Constants } from '../Constants/Constants';
import { FilterDto } from './dtos/filter.dto';
import { StudentResponse } from './dtos/student-response.dto';
import { UpdateStudentDto } from './dtos/update-user.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repo: Repository<Student>,
    private admissionsService: AdmissionsService,
    private contactsService: ContactsService,
    private addressesService: AddressesService,
  ) {}

  async extractExtraInfo(student: Student) {
    const studentId = student.id;
    student.addresses =
      await this.addressesService.getAddressesByStudentId(studentId);
    student.contacts =
      await this.contactsService.getContactsByStudentId(studentId);
    student.admissions =
      await this.admissionsService.getAdmissionByStudentId(studentId);

    return student;
  }
  async findOne(id: number) {
    if (!id) return null;
    const student = await this.repo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('Student Not Found');
    }
    return this.extractExtraInfo(student);
  }

  async create(student: CreateStudentDto) {
    //! Code is commented for testing
    // const existingStudent = await this.findByCNIC(student.cnic);
    // if (existingStudent) {
    //   throw new BadRequestException('User Already Exists With this CNIC...');
    // }

    const studentObj = this.repo.create(student);
    const newStudent = await this.repo.save(studentObj);
    // const studentId = newStudent['id'];

    //Get Extra Data
    // const addresses = student.addresses;
    // const contacts = student.contacts;
    // var admissions = student.admissions;
    //Now save extra info with respect to student id
    // addresses.forEach(async (address) => {
    //   await this.addressesService.create(address, newStudent);
    // });
    // if (contacts) {
    //   throw new BadRequestException('User Already Exists With this CNIC...');
    // }
    // contacts.forEach(async (contact) => {
    //   await this.contactsService.create(contact, newStudent);
    // });

    // if (!Array.isArray(admissions) && admissions) {
    //   admissions = [admissions]; // Wraps the non-array 'admissions' into an array
    // }

    // admissions.forEach(async (admission) => {
    //   await this.admissionsService.create(admission, newStudent);
    // });

    //return New Student Now
    return newStudent;
  }

  async update(id: number, attrs: UpdateStudentDto) {
    const queryRunner = this.repo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const student = await queryRunner.manager.findOne(Student, {
        where: { id },
      });

      if (!student) {
        throw new BadRequestException('Student Not Found!');
      }
      //Get Extra Data
      const addresses = attrs.addresses || [];
      const contacts = attrs.contacts || [];
      const admissions = attrs.admissions || [];

      //Remove extra information from obj
      attrs.addresses = undefined;
      attrs.contacts = undefined;
      attrs.admissions = undefined;

      Object.assign(student, attrs);
      const updatedStudent = await queryRunner.manager.save(student);

      //Now save extra info with respect to student id
      for (const address of addresses) {
        await this.addressesService.create(
          address,
          updatedStudent,
          queryRunner.manager,
        );
      }

      for (const contact of contacts) {
        await this.contactsService.create(
          contact,
          updatedStudent,
          queryRunner.manager,
        );
      }

      for (const admission of admissions) {
        await this.admissionsService.create(
          admission,
          updatedStudent,
          queryRunner.manager,
        );
      }

      await queryRunner.commitTransaction();

      return this.extractExtraInfo(updatedStudent);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const student = await this.findOne(id);

    if (!student) {
      throw new BadRequestException('Student Not Found!');
    }
    student.type = Constants.DELETED;
    return this.repo.save(student);
  }

  async findByCNIC(cnic: string) {
    if (!cnic) {
      throw new BadRequestException('CNIC is Required!');
    }

    const student = await this.repo.findOne({ where: { cnic } });
    return this.extractExtraInfo(student);
  }

  async terminate(studentId: number, terminationDto: TerminationDto) {
    const student = await this.findOne(studentId);
    if (!student) {
      throw new NotFoundException('Student Not Found');
    }

    //! This is commented because the reAdmit logic is missing
    // const terminated = await this.admissionsService.terminate(
    //   studentId,
    //   terminationDto,
    // );
    // if (terminated) {
    student.type = Constants.TERMINATED;
    // }

    return this.repo.save(student);
  }

  async reAdmit(studentId: number) {
    const student = await this.findOne(studentId);
    if (!student) {
      throw new NotFoundException('Student Not Found');
    }

    student.type = Constants.PRESENT;
    return this.repo.save(student);
  }

  private buildWhere(
    queryBuilder: SelectQueryBuilder<Student>,
    studentType: string,
    search?: string,
  ) {
    if (
      studentType === Constants.PRESENT ||
      studentType === Constants.TERMINATED
    ) {
      queryBuilder.andWhere('student.type = :studentType', { studentType });
    } else if (studentType === Constants.ALL) {
      queryBuilder.andWhere('student.type <> :studentType', {
        studentType: Constants.DELETED,
      });
    } else if (studentType !== Constants.ALL) {
      throw new BadRequestException(Constants.BAD_STUDENT_TYPE);
    }

    if (search && search !== 'null') {
      search = `%${search}%`;
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.orWhere('student.name ILIKE :search', { search })
            .orWhere('student.cnic ILIKE :search', { search })
            .orWhere('student.fatherName ILIKE :search', { search })
            .orWhere('student.fatherCnic ILIKE :search', { search })
            .orWhere('student.guardianName ILIKE :search', { search })
            .orWhere('student.guardianCnic ILIKE :search', { search });
        }),
      );
    }
    return queryBuilder;
  }

  async getStudents(studentType: string, filterDto: FilterDto) {
    const queryBuilder = this.repo.createQueryBuilder('student');

    this.buildWhere(queryBuilder, studentType, filterDto.search);

    const sortBy = filterDto.sortBy || Constants.DEFAULT_SORT_COLUMN;
    const sortType = filterDto.sortType || Constants.ASC;

    if (
      !Constants.SortableStudentColumns.includes(sortBy) ||
      ![Constants.ASC, Constants.DESC].includes(sortType)
    ) {
      throw new BadRequestException(Constants.BAD_SORT_DATA);
    }

    queryBuilder.orderBy(
      `student.${sortBy}`,
      sortType.toUpperCase() as 'ASC' | 'DESC',
    );

    queryBuilder
      .skip(
        (filterDto.pageIndex ?? 0) *
          (filterDto.pageSize ?? Constants.defaultPageSize),
      )
      .take(filterDto.pageSize ?? Constants.defaultPageSize);

    const [students, totalStudents] = await queryBuilder.getManyAndCount();

    const enhancedStudents = await Promise.all(
      students.map((student) => this.extractExtraInfo(student)),
    );

    return new StudentResponse({
      meta: { totalStudents },
      data: enhancedStudents,
    });
  }
}
