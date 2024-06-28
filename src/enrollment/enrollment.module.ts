import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { ClazzCourseModule } from '../clazz-course/clazz-course.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment]),ClazzCourseModule,StudentsModule],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
  controllers: [EnrollmentController],
})
export class EnrollmentModule {}
