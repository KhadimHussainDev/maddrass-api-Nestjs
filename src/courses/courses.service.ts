import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Course } from './entites/courses.entity';
import { CreateCourseDto } from './dtos/create-course.dto';
import { FilterDto } from './dtos/filter.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private repo: Repository<Course>) {}

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }
  async create(course: CreateCourseDto) {
    const courseObj = this.repo.create(course);

    return this.repo.save(courseObj);
  }

  async update(id: number, attrs: Partial<Course>) {
    const course = await this.findOne(id);

    if (!course) {
      throw new BadRequestException('Course Not Found!');
    }

    Object.assign(course, attrs);

    return this.repo.save(course);
  }

  async remove(id: number) {
    const course = await this.findOne(id);

    if (!course) {
      throw new BadRequestException('Course Not Found!');
    }

    return this.repo.remove(course);
  }

  async countWithConditions(filterDto: FilterDto) {
    const { name } = filterDto;

    const where: FindOptionsWhere<Course> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }

    const count = await this.repo.count({ where });
    return { count };
  }

  async findWithPagination(filterDto: FilterDto) {
    const { name, offset, limit } = filterDto;

    const where: FindOptionsWhere<Course> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }

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
