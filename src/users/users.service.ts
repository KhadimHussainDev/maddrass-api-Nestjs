import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(username: string, email: string, password: string) {
    const user = this.repo.create({ username, email, password });
    return this.repo.save(user);
  }
  save(user: User) {
    return this.repo.save(user);
  }
  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  findWithUsername(username: string) {
    if (username) return this.repo.findOneBy({ username });
  }
  findWithEmail(email: string) {
    if (email) return this.repo.findOneBy({ email });
  }

  find(username: string) {
    return this.repo.find({ where: { username } });
  }

  async update(id: number, newUser: Partial<CreateUserDto>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    Object.assign(user, newUser);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return this.repo.remove(user);
  }
}
