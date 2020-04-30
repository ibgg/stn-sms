import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentTestComponent } from './enrollment-test.component';

describe('EnrollmentTestComponent', () => {
  let component: EnrollmentTestComponent;
  let fixture: ComponentFixture<EnrollmentTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
