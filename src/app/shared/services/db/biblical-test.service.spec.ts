import { TestBed } from '@angular/core/testing';

import { BiblicalTestService } from './biblical-test.service';

describe('BiblicalTestService', () => {
  let service: BiblicalTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiblicalTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
