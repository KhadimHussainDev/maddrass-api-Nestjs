import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateClazzDto } from './dtos/create-class.dto';
import { ClazzesService } from './clazzes.service';
import { UpdateClazzDto } from './dtos/update-class.dto';
import { FilterDto } from './dtos/filter.dto';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('clazzes')
@UseGuards(AuthGuard)
export class ClazzesController {
  constructor(private clazzesService: ClazzesService) {}

  @Post()
  addClass(@Body() classDto: CreateClazzDto) {
    console.log(classDto);
    return this.clazzesService.create(classDto);
  }

  @Get('/count')
  countClazzes(@Query('where') query: string) {
    const filterClazzDto = JSON.parse(query) as FilterDto;

    return this.clazzesService.countWithConditions(filterClazzDto);
  }

  // @Get()
  // getAllClazzes() {
  //   return this.clazzesService.find();
  // }

  @Get()
  getAllClazzes(@Query('filter') query: string) {
    const filterClazzDto = JSON.parse(query) as FilterDto;

    return this.clazzesService.findWithPagination(filterClazzDto);
  }

  @Get('/:id')
  findClass(@Param('id') id: string) {
    return this.clazzesService.findOne(parseInt(id));
  }

  // @Patch('/:id')
  @Put('/:id')
  updateClass(@Param('id') id: string, @Body() classDto: UpdateClazzDto) {
    return this.clazzesService.update(parseInt(id), classDto);
  }

  @Delete('/:id')
  deleteClazz(@Param('id') id: string) {
    return this.clazzesService.remove(parseInt(id));
  }
}
