import { Test, TestingModule } from '@nestjs/testing';
import { ClazzesService } from './clazzes.service';

describe('ClazzesService', () => {
  let service: ClazzesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClazzesService],
    }).compile();

    service = module.get<ClazzesService>(ClazzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
