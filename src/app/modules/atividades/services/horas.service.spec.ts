/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HorasService } from './horas.service';

describe('Service: Horas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorasService]
    });
  });

  it('should ...', inject([HorasService], (service: HorasService) => {
    expect(service).toBeTruthy();
  }));
});
