import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dtos/create-result.dto';
import { UpdateResultDto } from './dtos/update-result.dto';
import { FilterResultDto } from './dtos/filter.dto';

@Controller('results')
@UseGuards(AuthGuard)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  async create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResultDto: UpdateResultDto,
  ) {
    return this.resultsService.update(id, updateResultDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resultsService.findOne(id);
  }

  @Get()
  async findAll(
    @Body() filterResultDto: FilterResultDto,
    // @Query('filter') query: string,
  ) {
    // const filterResultDto = JSON.parse(query) as FilterResultDto;
    return this.resultsService.findAll(filterResultDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.resultsService.remove(id);
  }
}
