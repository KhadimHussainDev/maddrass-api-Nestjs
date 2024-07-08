import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';
import { AdmissionsService } from './admissions.service';

@Controller('')
@UseGuards(AuthGuard)
export class AdmissionsController {
  constructor(private admissionsService: AdmissionsService) {}

  @Get('students/:id/admissions')
  findAdmissions(@Param('id') id: string) {
    return this.admissionsService.getAdmissionByStudentId(parseInt(id));
  }
}
