import { TestBed } from '@angular/core/testing';

import { TaxiGuard } from './taxi.guard';

describe('TaxiGuard', () => {
  let guard: TaxiGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TaxiGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
