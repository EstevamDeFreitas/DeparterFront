/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModoAdminService } from './modo-admin.service';

describe('Service: ModoAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModoAdminService]
    });
  });

  it('should ...', inject([ModoAdminService], (service: ModoAdminService) => {
    expect(service).toBeTruthy();
  }));
});
