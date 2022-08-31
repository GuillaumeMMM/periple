import { TestBed } from '@angular/core/testing';

import { LocalSotrageService } from './local-sotrage.service';

describe('LocalSotrageService', () => {
  let service: LocalSotrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalSotrageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
