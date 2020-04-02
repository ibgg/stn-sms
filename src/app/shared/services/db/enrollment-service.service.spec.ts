import { TestBed } from '@angular/core/testing';

import { EnrollmentServiceService } from './enrollment-service.service';

describe('EnrollmentServiceService', () => {
  let service: EnrollmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
