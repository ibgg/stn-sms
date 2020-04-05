import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPersonalComponent } from './test-personal.component';

describe('TestPersonalComponent', () => {
  let component: TestPersonalComponent;
  let fixture: ComponentFixture<TestPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
