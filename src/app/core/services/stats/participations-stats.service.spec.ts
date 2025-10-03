import { TestBed } from '@angular/core/testing';
import { ParticipationsStatsService } from './participations-stats.service';


describe('ParticipationsService', () => {
  let service: ParticipationsStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipationsStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
