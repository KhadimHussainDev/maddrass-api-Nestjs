import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('contacts')
@UseGuards(AuthGuard)
export class ContactsController {}
