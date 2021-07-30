import { TestBed } from '@angular/core/testing';

import { PlaceholderFunctionService } from './placeholder-function.service';

describe('PlaceholderFunctionService', () => {
  let service: PlaceholderFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceholderFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
