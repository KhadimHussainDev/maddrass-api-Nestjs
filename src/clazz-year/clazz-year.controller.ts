import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('clazz-year')
@UseGuards(AuthGuard)
export class ClazzYearController {}
