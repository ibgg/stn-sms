import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblicalTestComponent } from './biblical-test';

describe('BiblicalTestComponent', () => {
  let component: BiblicalTestComponent;
  let fixture: ComponentFixture<BiblicalTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblicalTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblicalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
