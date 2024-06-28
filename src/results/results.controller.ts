import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('results')
@UseGuards(AuthGuard)
export class ResultsController {}
