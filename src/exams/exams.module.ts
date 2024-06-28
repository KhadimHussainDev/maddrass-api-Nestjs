import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exams.entity';
import { ClazzCourseModule } from '../clazz-course/clazz-course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]) , ClazzCourseModule,],
  providers: [ExamsService],
  exports: [ExamsService],
  controllers: [ExamsController],
})
export class ExamsModule {}
