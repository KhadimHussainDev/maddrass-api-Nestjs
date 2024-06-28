import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('')
@UseGuards(AuthGuard)
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

 
  @Get('students/:id/addresses')
  findAddress(@Param('id') id: string) {
    return this.addressesService.getAddressesByStudentId(parseInt(id));
  }
}
