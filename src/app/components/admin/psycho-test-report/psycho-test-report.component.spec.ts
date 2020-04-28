import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychoTestReportComponent } from './psycho-test-report.component';

describe('PsychoTestReportComponent', () => {
  let component: PsychoTestReportComponent;
  let fixture: ComponentFixture<PsychoTestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychoTestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychoTestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
