import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('clazz-course')
@UseGuards(AuthGuard)
export class ClazzCourseController {}
