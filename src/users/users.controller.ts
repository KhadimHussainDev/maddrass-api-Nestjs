import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/user.dto';
import { serialize } from 'interceptors/serialize.interceptor';
import { SignInDto } from './dtos/sign-in.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { AuthGuard } from './guards/auth.guard';
import { single } from 'rxjs';

@Controller()
@serialize(UserDto)
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Post('login')
  async signIn(@Body() body: SignInDto, @Session() session: any) {
    // console.log(body)
    const user = await this.authService.signIn(body.username, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(
      body.username,
      body.email,
      body.password,
    );

    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  // @UseGuards(AuthGuard)
  signOut(@Session() session: any) {
    session.userId = null;
  }

  //! Temporary  Route to sign out on chrome
  @Get('/signout')
  // @UseGuards(AuthGuard)
  signOutGet(@Session() session: any) {
    session.userId = null;
  }
}
