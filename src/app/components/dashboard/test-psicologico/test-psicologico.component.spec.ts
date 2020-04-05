import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPsicologicoComponent } from './test-psicologico.component';

describe('TestPsicologicoComponent', () => {
  let component: TestPsicologicoComponent;
  let fixture: ComponentFixture<TestPsicologicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPsicologicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPsicologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
