import { TestBed } from '@angular/core/testing';

import { CommonTasksServiceService } from './common-tasks-service.service';

describe('CommonTasksServiceService', () => {
  let service: CommonTasksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonTasksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
