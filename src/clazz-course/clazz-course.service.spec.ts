import { Test, TestingModule } from '@nestjs/testing';
import { ClazzCourseService } from './clazz-course.service';

describe('ClazzCourseService', () => {
  let service: ClazzCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClazzCourseService],
    }).compile();

    service = module.get<ClazzCourseService>(ClazzCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
