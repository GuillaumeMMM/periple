import { TestBed } from '@angular/core/testing';

import { PeripleService } from './periple.service';

describe('PeripleService', () => {
  let service: PeripleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeripleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
