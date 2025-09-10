import { TestBed } from '@angular/core/testing';

import { OlympicStatsService } from './olympic-stats.service';

describe('OlympicStatsService', () => {
  let service: OlympicStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlympicStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
