import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementReportComponent } from './agreement-report.component';

describe('AgreementReportComponent', () => {
  let component: AgreementReportComponent;
  let fixture: ComponentFixture<AgreementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
