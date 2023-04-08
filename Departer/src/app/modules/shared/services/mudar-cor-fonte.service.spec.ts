import { TestBed } from '@angular/core/testing';

import { MudarCorFonteService } from './mudar-cor-fonte.service';

describe('MudarCorFonteService', () => {
  let service: MudarCorFonteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MudarCorFonteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
