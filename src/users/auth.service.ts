import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { MoreThan, Repository } from 'typeorm';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { nanoid } from 'nanoid';
import { ResetToken } from './entities/reset-token.entity';
import { MailService } from './services/mail.service';

const { v4: uuidv4 } = require('uuid');
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
    @InjectRepository(ResetToken)
    private resetTokenRepo: Repository<ResetToken>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signUp(username: string, email: string, password: string) {
    const existingUser = await this.usersService.findWithUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username unavailable');
    }

    password = await this.encrypt(password);

    const user = await this.usersService.create(username, email, password);

    // return user;
    return this.generateUserToken(user.id);
  }

  async signIn(username: string, password: string) {
    const existingUser = await this.usersService.findWithUsername(username);
    if (!existingUser) {
      throw new BadRequestException('Invalid Username');
    }

    if (!(await this.comparePasswords(existingUser.password, password))) {
      throw new BadRequestException('Invalid Password');
    }
    // return existingUser;
    return this.generateUserToken(existingUser.id);
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {

    const existingUser = await this.usersService.findOne(userId);
    if (!existingUser) {
      throw new BadRequestException('Invalid Username');
    }
    //Compare password with db password
    if (
      !(await this.comparePasswords(
        existingUser.password,
        changePasswordDto.oldPassword,
      ))
    ) {
      throw new BadRequestException('Invalid Old Password');
    }

    existingUser.password = await this.encrypt(changePasswordDto.newPassword);

    const updatedUser = await this.usersService.save(existingUser);
    return updatedUser;
  }

  //Todo: Emails send nai ho rahi
  async forgotPassword(email: string) {
    //Check whether user exist with this email
    const existingUser = await this.usersService.findWithEmail(email);
    var resetToken = '';
    if (existingUser) {
      //Random reset token
      resetToken = nanoid(64);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // Expires in 1 hour

      //Find if token already exist for this user
      let resetTokenObj = await this.resetTokenRepo.findOne({
        where: { userId: existingUser.id },
      });

      if (resetTokenObj) {
        resetTokenObj.token = resetToken;
        resetTokenObj.expiryDate = expiryDate;
      } else {
        resetTokenObj = this.resetTokenRepo.create({
          token: resetToken,
          userId: existingUser.id,
          expiryDate,
        });
      }

      await this.resetTokenRepo.save(resetTokenObj);

      //Send the email link
      await this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    return {
      message: 'Reset password link sent to respected email',
      resetToken,
    };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    const token = await this.resetTokenRepo.findOne({
      where: { token: resetToken, expiryDate: MoreThan(new Date()) },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid Link');
    }
    this.resetTokenRepo.remove(token);

    const existingUser = await this.usersService.findOne(token.userId);
    if (!existingUser) {
      throw new InternalServerErrorException();
    }

    existingUser.password = await this.encrypt(newPassword);
    await this.usersService.save(existingUser);
    return { message: 'Password has been changed!!' };
  }

  async generateUserToken(userId: number) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '12h' });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, userId);

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token: string, userId: number) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    // Check if a token already exists for the user
    let tokenObj = await this.refreshTokenRepo.findOne({ where: { userId } });

    if (tokenObj) {
      // Token exists, update the token and expiry date
      tokenObj.token = token;
      tokenObj.expiryDate = expiryDate;
    } else {
      // No token exists, create a new one
      tokenObj = this.refreshTokenRepo.create({ token, userId, expiryDate });
    }

    await this.refreshTokenRepo.save(tokenObj);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const currentDate = new Date();

    const token = await this.refreshTokenRepo.findOne({
      where: {
        token: refreshToken,
        expiryDate: MoreThan(currentDate),
      },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh Token Not Valid');
    }
    if (userId !== token.userId) {
    
      throw new UnauthorizedException(
        'Refresh Token is Not Valid for this User',
      );
    }
    return this.generateUserToken(token.userId);
  }
  async encrypt(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return result;
  }

  async comparePasswords(encryptedPassword: string, plainPassword: string) {
    const salt = encryptedPassword.split('.')[0];
    const hash = (await scrypt(plainPassword, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return result === encryptedPassword;
  }
}
