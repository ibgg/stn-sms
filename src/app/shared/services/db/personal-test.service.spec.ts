import { TestBed } from '@angular/core/testing';

import { PersonalTestService } from './personal-test.service';

describe('PersonalTestService', () => {
  let service: PersonalTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
