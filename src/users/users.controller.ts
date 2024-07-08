import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/user.dto';
import { serialize } from 'interceptors/serialize.interceptor';
import { SignInDto } from './dtos/sign-in.dto';
import { CurrentUserId } from './decorators/current-user.decorator';
import { User } from './entities/users.entity';
import { AuthGuard } from './guards/auth.guard';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';


@Controller()
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('whoAmI')
  @serialize(UserDto)
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUserId() currentUserId: number) {
    return this.usersService.findOne(currentUserId);
  }

  @Post('login')
  async signIn(@Body() body: any /*SignInDto*/, @Session() session: any) {
   
    const tokens = await this.authService.signIn(body.username, body.password);
    // session.userId = user.id;
    // return user;
   

    return tokens;
  }

  @Post('signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const tokens = await this.authService.signUp(
      body.username,
      body.email,
      body.password,
    );

    // session.userId = user.id;
    return tokens;
  }

  @Post('/signout')
  @UseGuards(AuthGuard)
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('refresh')
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @CurrentUserId() userId: number,
  ) {
    return this.authService.refreshTokens(userId, refreshTokenDto.token);
  }

  @UseGuards(AuthGuard)
  @serialize(UserDto)
  @Put('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUserId() currentUserId: number,
  ) {
    return this.authService.changePassword(currentUserId, changePasswordDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.resetToken,
      resetPasswordDto.newPassword,
    );
  }
}
