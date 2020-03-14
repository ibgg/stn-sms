import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBiblicoComponent } from './test-biblico.component';

describe('TestBiblicoComponent', () => {
  let component: TestBiblicoComponent;
  let fixture: ComponentFixture<TestBiblicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBiblicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBiblicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
