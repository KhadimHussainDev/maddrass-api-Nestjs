import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';
import { ContactsService } from './contacts.service';

@Controller('')
@UseGuards(AuthGuard)
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get('students/:id/contacts')
  findContacts(@Param('id') id: string) {
    return this.contactsService.getContactsByStudentId(parseInt(id));
  }
}
