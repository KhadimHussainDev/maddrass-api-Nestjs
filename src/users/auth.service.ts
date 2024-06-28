import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(username: string, email: string, password: string) {
    const existingUser = await this.usersService.find(username);
    if (existingUser.length) {
      throw new BadRequestException('Username unavailable');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(username, email, result);
    return user;
  }

  async signIn(username: string, password: string) {
    const existingUser = await this.usersService.find(username);
    if (!existingUser.length) {
      throw new BadRequestException('Invalid Username');
    }

    const correctPassword = existingUser[0].password;
    const salt = correctPassword.split('.')[0];

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    if (result !== correctPassword) {
      throw new BadRequestException('Invalid Password');
    }

    return existingUser[0];
  }
}
