import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblicalTestReportComponent } from './biblical-test-report.component';

describe('BiblicalTestReportComponent', () => {
  let component: BiblicalTestReportComponent;
  let fixture: ComponentFixture<BiblicalTestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblicalTestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblicalTestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
