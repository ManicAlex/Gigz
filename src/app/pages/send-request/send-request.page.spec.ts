import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequestPage } from './send-request.page';

describe('SendRequestPage', () => {
  let component: SendRequestPage;
  let fixture: ComponentFixture<SendRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
