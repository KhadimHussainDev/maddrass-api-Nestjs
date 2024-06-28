import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { CoursesModule } from './courses/courses.module';
import { AddressesModule } from './addresses/addresses.module';
import { ContactsModule } from './contacts/contacts.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { StudentsModule } from './students/students.module';
import { Address } from './addresses/entities/addresses.entity';
import { Admission } from './admissions/entities/admissions.entity';
import { Clazz } from './clazzes/entities/clazzes.entity';
import { Contact } from './contacts/entities/contacts.entity';
import { Course } from './courses/entites/courses.entity';
import { Student } from './students/entities/students.entity';
import { ClazzYearModule } from './clazz-year/clazz-year.module';
import { ClazzYear } from './clazz-year/entities/clazz-year.entity';
import { ClazzesModule } from './clazzes/clazzes.module';
import { ClazzCourseModule } from './clazz-course/clazz-course.module';
import { ClazzCourse } from './clazz-course/entities/clazz-course.entity';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Enrollment } from './enrollment/entities/enrollment.entity';
import { ResultsModule } from './results/results.module';
import { Result } from './results/entities/results.entity';
import { ExamsModule } from './exams/exams.module';
import { Exam } from './exams/entities/exams.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'Khadim',
      password: 'admin',
      database: 'db',
      entities: [
        User,
        Address,
        Admission,
        Clazz,
        Contact,
        Course,
        Student,
        ClazzYear,
        ClazzCourse,
        Enrollment,
        Result,
        Exam,
      ],
      autoLoadEntities : true,
      synchronize: true,
    }),
    CoursesModule,
    ClazzesModule,
    AddressesModule,
    ContactsModule,
    AdmissionsModule,
    StudentsModule,
    ClazzYearModule,
    ClazzCourseModule,
    EnrollmentModule,
    ResultsModule,
    ExamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
