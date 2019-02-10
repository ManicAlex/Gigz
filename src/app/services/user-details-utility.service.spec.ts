import { TestBed } from '@angular/core/testing';

import { UserDetailsUtilityService } from './user-details-utility.service';

describe('UserDetailsUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDetailsUtilityService = TestBed.get(UserDetailsUtilityService);
    expect(service).toBeTruthy();
  });
});
