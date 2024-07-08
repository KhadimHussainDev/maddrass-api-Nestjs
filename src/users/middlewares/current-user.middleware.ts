//! Middleware khatam kr di hai q k ye guard se pehly run hoti
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { UsersService } from '../users.service';
// import { NextFunction, Request, Response } from 'express';
// import { User } from '../entities/users.entity';

// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: User;
//     }
//   }
// }

// @Injectable()
// export class CurrentUserMiddleware implements NestMiddleware {
//   constructor(private usersService: UsersService) {}
//   async use(req: any, res: any, next: NextFunction) {
//     const userId = req.userId;


//     if (userId) {
//       const user = await this.usersService.findOne(userId);
//       req.currentUser = user;
//     }
//     next();
//   }
// }
