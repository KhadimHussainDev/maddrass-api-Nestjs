import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/addresses.entity';
import { EntityManager, Repository } from 'typeorm';
import { Student } from '../students/entities/students.entity';


@Injectable()
export class AddressesService {
  constructor(@InjectRepository(Address) private repo: Repository<Address>) {}
  find() {
    return this.repo.find();
  }
  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }
  async create(
    address: CreateAddressDto,
    student: Student,
    manager?: EntityManager,
  ) {
    const addressObj = this.repo.create(address);
    addressObj.student = student;
    const repository = manager ? manager.getRepository(Address) : this.repo;
    return repository.save(addressObj);
  }

  async update(id: number, attrs: Partial<Address>) {
    const address = await this.findOne(id);

    if (!address) {
      throw new BadRequestException('Address Not Found!!');
    }

    Object.assign(address, attrs);

    return this.repo.save(address);
  }

  async remove(id: number) {
    const address = await this.findOne(id);

    if (!address) {
      throw new BadRequestException('Address Not Found!!');
    }

    return this.repo.remove(address);
  }

  async getAddressesByStudentId(studentId: number) {
    // const student = await this.findOne(studentId);
    if (!studentId) {
      throw new BadRequestException('Student Id is Required');
    }

    return this.repo.find({
      where: { student: { id: studentId } },
    });
  }
}
