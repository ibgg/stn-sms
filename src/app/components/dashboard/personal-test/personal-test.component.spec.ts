import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTestComponent } from './personal-test.component';

describe('PersonalTestComponent', () => {
  let component: PersonalTestComponent;
  let fixture: ComponentFixture<PersonalTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
