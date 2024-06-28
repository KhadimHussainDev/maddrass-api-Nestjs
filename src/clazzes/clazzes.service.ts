import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clazz } from './entities/Clazzes.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateClazzDto } from './dtos/create-class.dto';
import { FilterDto } from './dtos/filter.dto';

@Injectable()
export class ClazzesService {
  constructor(@InjectRepository(Clazz) private repo: Repository<Clazz>) {}

  find() {
    return this.repo.find();
  }
  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }
  async create(clazz: CreateClazzDto) {
    const clazzObj = this.repo.create(clazz);

    return this.repo.save(clazzObj);
  }

  async update(id: number, attrs: Partial<Clazz>) {
    const clazz = await this.findOne(id);

    if (!clazz) {
      throw new BadRequestException('Clazz Not Found!');
    }

    Object.assign(clazz, attrs);

    return this.repo.save(clazz);
  }

  async remove(id: number) {
    const clazz = await this.findOne(id);

    if (!clazz) {
      throw new BadRequestException('Clazz Not Found!');
    }

    return this.repo.remove(clazz);
  }
  async countWithConditions(filterDto: FilterDto) {
    const { name } = filterDto;

    // Building dynamic query based on provided DTO
    const where: FindOptionsWhere<Clazz> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }

    // Retrieve count of items matching the conditions
    const count = await this.repo.count({
      where,
    });

    return { count };
  }

  async findWithPagination(filterDto: FilterDto) {
    const { name, offset, limit } = filterDto;

    // Building dynamic query based on provided DTO
    const where: FindOptionsWhere<Clazz> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }

    // Retrieve items with conditions and pagination
    const [items, count] = await this.repo.findAndCount({
      where,
      skip: offset,
      take: limit,
    });

    return {
      total: count,
      data: items,
      offset,
      limit,
    };
  }
}
