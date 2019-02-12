import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Userprofile2Component } from './userprofile2.component';

describe('Userprofile2Component', () => {
  let component: Userprofile2Component;
  let fixture: ComponentFixture<Userprofile2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Userprofile2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Userprofile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
