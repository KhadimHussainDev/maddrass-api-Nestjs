import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('enrollment')
@UseGuards(AuthGuard)
export class EnrollmentController {}
