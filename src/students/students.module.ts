import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/students.entity';
import { AddressesModule } from '../addresses/addresses.module';
import { ContactsModule } from '../contacts/contacts.module';
import { AdmissionsModule } from '../admissions/admissions.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    AddressesModule,
    ContactsModule,
    AdmissionsModule
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
