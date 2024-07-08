import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { AuthService } from './auth.service';
// import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { RefreshToken } from './entities/refresh-token.entity';
import { ResetToken } from './entities/reset-token.entity';
import { MailService } from './services/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, ResetToken])],
  providers: [UsersService, AuthService, MailService],
  controllers: [UsersController],
})
export class UsersModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CurrentUserMiddleware).forRoutes('*');
  // }
}
