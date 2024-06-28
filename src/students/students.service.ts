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

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repo: Repository<Student>,
    private admissionsService: AdmissionsService,
    private contactsService: ContactsService,
    private addressesService: AddressesService,
  ) {}

  async extractExtraInfo(studentId: number, student: Student) {
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
    return this.extractExtraInfo(id, student);
  }

  async create(student: CreateStudentDto) {
    //! Code is commented for testing
    // const existingStudent = await this.findByCnic(student.cnic);
    // if (existingStudent) {
    //   throw new BadRequestException('User Already Exists With this CNIC...');
    // }

    // console.log(student);

    const studentObj = this.repo.create(student);
    const newStudent = await this.repo.save(studentObj);
    // const studentId = newStudent['id'];
    // console.log(newStudent);

    //Get Extra Data
    const addresses = student.addresses;
    const contacts = student.contacts;
    const admissions = student.admissions;
    //Now save extra info with respect to student id
    addresses.forEach(async (address) => {
      await this.addressesService.create(address, newStudent);
    });

    contacts.forEach(async (contact) => {
      await this.contactsService.create(contact, newStudent);
    });
    admissions.forEach(async (admission) => {
      await this.admissionsService.create(admission, newStudent);
    });

    //return New Student Now
    return newStudent;
  }

  async update(id: number, attrs: Partial<Student>) {
    const student = await this.findOne(id);

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
    const updatedStudent = await this.repo.save(student);

    //Now save extra info with respect to student id
    addresses.forEach(async (address) => {
      await this.addressesService.create(address, updatedStudent);
    });

    contacts.forEach(async (contact) => {
      await this.contactsService.create(contact, updatedStudent);
    });
    admissions.forEach(async (admission) => {
      await this.admissionsService.create(admission, updatedStudent);
    });

    //! Returns old phone no but if use find one again , returns updated data of contacts,addresses
    //! Maybe some kind of transection is happening
    // return this.extractExtraInfo(updatedStudent.id, updatedStudent);
    return updatedStudent;
    // return this.findOne(id)
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
    return this.extractExtraInfo(student.id, student);
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
            .orWhere('student.fatherCnic ILIKE :search', { search });
        }),
      );
    }
    return queryBuilder;
  }

  async getStudents(studentType: string, filterDto: FilterDto) {
    // console.log(studentType, filterDto);
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

    return new StudentResponse({
      meta: { totalStudents },
      data: students,
    });
  }
}
