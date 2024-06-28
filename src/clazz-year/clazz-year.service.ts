import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClazzYear } from './entities/clazz-year.entity';
import { CreateClazzYearDto } from './dtos/create-class-year.dto';
import { Repository } from 'typeorm';
import { ClazzesService } from '../clazzes/clazzes.service';
import { CreateClazzDto } from '../clazzes/dtos/create-class.dto';
import { UpdateClazzYearDto } from './dtos/update-clazz-year.dto';

@Injectable()
export class ClazzYearService {
  constructor(
    @InjectRepository(ClazzYear) private repo: Repository<ClazzYear>,
    private clazzesService: ClazzesService,
  ) {}

  async createByClazzName(clazzName: string, year: number) {
    const clazz = await this.clazzesService.create({
      name: clazzName,
    } as CreateClazzDto);

    const classYear = await this.repo.create({ year });
    classYear.clazz = clazz;
    return this.repo.save(classYear);
  }

  async create(createClazzYearDto: CreateClazzYearDto) {
    const clazzId = createClazzYearDto.clazzId;
    const clazz = await this.clazzesService.findOne(clazzId);

    if (!clazz) {
      throw new BadRequestException('Clazz With given id is not Found!!');
    }
    const clazzYear = this.repo.create(createClazzYearDto);
    clazzYear.clazz = clazz;
    return this.repo.save(clazzYear);
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findAll() {
    return this.repo.find();
  }

  async update(id: number, updateClazzYearDto: UpdateClazzYearDto) {
    const clazzYear = await this.findOne(id);
    if (!clazzYear) {
      throw new Error('ClazzYear not found');
    }
    Object.assign(clazzYear, updateClazzYearDto);
    return this.repo.save(clazzYear);
  }

  async remove(id: number) {
    const clazzYear = await this.findOne(id);
    if (!clazzYear) {
      throw new Error('ClazzYear not found');
    }
    await this.repo.remove(clazzYear);
  }

  async findByYear(year: number): Promise<ClazzYear[]> {
    return this.repo.find({ where: { year } });
  }

  async assignClazz(id: number, clazzId: number): Promise<ClazzYear> {
    const clazzYear = await this.findOne(id);
    if (!clazzYear) {
      throw new Error('ClazzYear not found');
    }

    const clazz = await this.clazzesService.findOne(clazzId);

    if (!clazz) {
      throw new BadRequestException('Clazz With given id is not Found!!');
    }
    clazzYear.clazz = clazz;
    return this.repo.save(clazzYear);
  }
}
