import { TestBed } from '@angular/core/testing';

import { CustomersManagementService } from './customers-management.service';

describe('CustomersManagementService', () => {
  let service: CustomersManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
