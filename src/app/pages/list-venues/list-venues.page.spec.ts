import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVenuesPage } from './list-venues.page';

describe('ListVenuesPage', () => {
  let component: ListVenuesPage;
  let fixture: ComponentFixture<ListVenuesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVenuesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVenuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
