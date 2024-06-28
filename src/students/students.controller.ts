import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dtos/update-user.dto';
import { FilterDto } from './dtos/filter.dto';
import { Constants } from '../Constants/Constants';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('students')
@UseGuards(AuthGuard)
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
  createStudent(@Body() student: any) {
    return this.studentsService.create(student);
  }

  @Get('/:id')
  getStudent(@Param('id') id: string) {
    return this.studentsService.findOne(parseInt(id));
  }

  @Get()
  getStudentsByFilter(
    @Query('studentType') studentType: string,
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('search') search: string,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType: string,
  ) {
    const filterDto = new FilterDto({
      pageIndex,
      pageSize,
      search,
      sortBy,
      sortType,
    });
    return this.studentsService.getStudents(
      studentType || Constants.PRESENT,
      filterDto,
    );
  }

  @Get('/cnic/:cnic')
  getStudentByCNIC(@Param('cnic') cnic: string) {
    return this.studentsService.findByCNIC(cnic);
  }

  @Put('/:id')
  updateStudent(@Param('id') id: string, @Body() student: UpdateStudentDto) {
    return this.studentsService.update(parseInt(id), student);
  }

  @Delete('/:id')
  deleteStudent(@Param('id') id: string) {
    return this.studentsService.remove(parseInt(id));
  }
}
