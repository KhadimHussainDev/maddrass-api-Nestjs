import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contacts.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateContactDto } from './dtos/create-contact.dto';
import { Student } from '../students/entities/students.entity';

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private repo: Repository<Contact>) {}

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }
  async create(
    contact: CreateContactDto,
    student: Student,
    manager?: EntityManager,
  ) {
    const contactObj = this.repo.create(contact);
    contactObj.student = student;
    const repository = manager ? manager.getRepository(Contact) : this.repo;
    return repository.save(contactObj);
  }

  async update(id: number, attrs: Partial<Contact>) {
    const contact = await this.findOne(id);

    if (!contact) {
      throw new BadRequestException('Contact Not Found!');
    }

    Object.assign(contact, attrs);

    return this.repo.save(contact);
  }

  async remove(id: number) {
    const contact = await this.findOne(id);

    if (!contact) {
      throw new BadRequestException('Contact Not Found!');
    }

    return this.repo.remove(contact);
  }

  async getContactsByStudentId(studentId: number) {
    if (!studentId) {
      throw new BadRequestException('Student ID is required');
    }

    return this.repo.find({
      where: { student: { id: studentId } },
    });
  }
}
