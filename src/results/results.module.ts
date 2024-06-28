import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/results.entity';
import { ExamsModule } from '../exams/exams.module';
import { EnrollmentModule } from '../enrollment/enrollment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Result]), ExamsModule, EnrollmentModule],
  providers: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}
