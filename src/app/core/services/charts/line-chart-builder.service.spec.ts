import { TestBed } from '@angular/core/testing';

import { LineChartBuilderService } from './line-chart-builder.service';

describe('ChartLineBuilderService', () => {
  let service: LineChartBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineChartBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
