import { Test, TestingModule } from '@nestjs/testing';
import { ClazzYearController } from './clazz-year.controller';

describe('ClazzYearController', () => {
  let controller: ClazzYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClazzYearController],
    }).compile();

    controller = module.get<ClazzYearController>(ClazzYearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
