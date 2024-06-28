import { Module } from '@nestjs/common';
import { ClazzCourseService } from './clazz-course.service';
import { ClazzCourseController } from './clazz-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClazzCourse } from './entities/clazz-course.entity';
import { CoursesModule } from '../courses/courses.module';
import { ClazzYearModule } from '../clazz-year/clazz-year.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClazzCourse]),
    CoursesModule,
    ClazzYearModule,
  ],
  providers: [ClazzCourseService],
  exports: [ClazzCourseService],
  controllers: [ClazzCourseController],
})
export class ClazzCourseModule {}
