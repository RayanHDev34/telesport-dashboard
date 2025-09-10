import { TestBed } from '@angular/core/testing';

import { OlympicApiService } from './olympic-api.service';

describe('OlympicApiService', () => {
  let service: OlympicApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlympicApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
