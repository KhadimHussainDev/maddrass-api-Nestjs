import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('admissions')
@UseGuards(AuthGuard)
export class AdmissionsController {}
