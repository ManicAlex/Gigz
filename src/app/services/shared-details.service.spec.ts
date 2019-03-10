import { TestBed } from '@angular/core/testing';

import { SharedDetailsService } from './shared-details.service';

describe('SharedDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedDetailsService = TestBed.get(SharedDetailsService);
    expect(service).toBeTruthy();
  });
});
