import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTestReportComponent } from './personal-test-report.component';

describe('PersonalTestReportComponent', () => {
  let component: PersonalTestReportComponent;
  let fixture: ComponentFixture<PersonalTestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalTestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
