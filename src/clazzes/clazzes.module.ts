import { Module } from '@nestjs/common';
import { ClazzesService } from './clazzes.service';
import { ClazzesController } from './clazzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clazz } from './entities/Clazzes.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Clazz])],
  providers: [ClazzesService],
  controllers: [ClazzesController],
  exports : [ClazzesService]
})
export class ClazzesModule {}
