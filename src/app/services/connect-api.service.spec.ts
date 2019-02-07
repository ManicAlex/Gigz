import { TestBed } from '@angular/core/testing';

import { ConnectApiService } from './connect-api.service';

describe('ConnectApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectApiService = TestBed.get(ConnectApiService);
    expect(service).toBeTruthy();
  });
});
