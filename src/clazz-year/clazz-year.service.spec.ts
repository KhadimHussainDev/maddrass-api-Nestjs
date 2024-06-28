import { Test, TestingModule } from '@nestjs/testing';
import { ClazzYearService } from './clazz-year.service';

describe('ClazzYearService', () => {
  let service: ClazzYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClazzYearService],
    }).compile();

    service = module.get<ClazzYearService>(ClazzYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
