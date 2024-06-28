import { Module } from '@nestjs/common';
import { ClazzYearService } from './clazz-year.service';
import { ClazzYearController } from './clazz-year.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClazzYear } from './entities/clazz-year.entity';
import { ClazzesModule } from '../clazzes/clazzes.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClazzYear]) , ClazzesModule],
  providers: [ClazzYearService],
  exports: [ClazzYearService],
  controllers: [ClazzYearController],
})
export class ClazzYearModule {}
