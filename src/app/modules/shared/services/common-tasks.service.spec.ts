import { TestBed } from '@angular/core/testing';

import { CommonTasksService } from './common-tasks.service';

describe('CommonTasksService', () => {
  let service: CommonTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
