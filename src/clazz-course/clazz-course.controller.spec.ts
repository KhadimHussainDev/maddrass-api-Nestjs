import { Test, TestingModule } from '@nestjs/testing';
import { ClazzCourseController } from './clazz-course.controller';

describe('ClazzCourseController', () => {
  let controller: ClazzCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClazzCourseController],
    }).compile();

    controller = module.get<ClazzCourseController>(ClazzCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
