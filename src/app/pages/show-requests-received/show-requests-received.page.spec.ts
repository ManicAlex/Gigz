import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestsReceivedPage } from './show-requests-received.page';

describe('ShowRequestsReceivedPage', () => {
  let component: ShowRequestsReceivedPage;
  let fixture: ComponentFixture<ShowRequestsReceivedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRequestsReceivedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRequestsReceivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
