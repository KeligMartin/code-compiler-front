import { TestBed } from '@angular/core/testing';

import { CodeQualityService } from './code-quality.service';

describe('CodeQualityService', () => {
  let service: CodeQualityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeQualityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
