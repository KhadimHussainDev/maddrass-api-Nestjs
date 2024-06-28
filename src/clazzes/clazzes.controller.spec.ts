import { Test, TestingModule } from '@nestjs/testing';
import { ClazzesController } from './clazzes.controller';

describe('ClazzesController', () => {
  let controller: ClazzesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClazzesController],
    }).compile();

    controller = module.get<ClazzesController>(ClazzesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
