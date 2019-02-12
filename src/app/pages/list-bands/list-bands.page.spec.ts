import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBandsPage } from './list-bands.page';

describe('ListBandsPage', () => {
  let component: ListBandsPage;
  let fixture: ComponentFixture<ListBandsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBandsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
