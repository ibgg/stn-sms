import { TestBed } from '@angular/core/testing';

import { PsychologicalService } from './psychological.service';

describe('PsychologicalService', () => {
  let service: PsychologicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychologicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
