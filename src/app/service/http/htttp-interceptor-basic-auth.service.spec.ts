import { TestBed } from '@angular/core/testing';

import { HtttpInterceptorBasicAuthService } from './htttp-interceptor-basic-auth.service';

describe('HtttpInterceptorBasicAuthService', () => {
  let service: HtttpInterceptorBasicAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtttpInterceptorBasicAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
