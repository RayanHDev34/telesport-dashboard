import { TestBed } from '@angular/core/testing';

import { ChartLineBuilderService } from './chart-line-builder.service';

describe('ChartLineBuilderService', () => {
  let service: ChartLineBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartLineBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
