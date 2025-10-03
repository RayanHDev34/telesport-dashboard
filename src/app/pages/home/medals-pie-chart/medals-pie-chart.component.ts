import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { OlympicCountry } from 'src/app/core/models/olympic.models';
import { EChartsOption, ECharts, ECElementEvent } from 'echarts';
import { MedalPieData } from 'src/app/core/models/medal-pie-data.models';
import { ChartBuilderService } from 'src/app/core/services/chart-builder.service';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-medals-pie-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './medals-pie-chart.component.html',
  styleUrls: ['./medals-pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedalsPieChartComponent implements OnChanges {
  @Input() countries: OlympicCountry[] = [];
  @Input() showLegend = false;

  options: EChartsOption | null = null;

constructor(
    private router: Router,
    private charts: ChartBuilderService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('countries' in changes || 'showLegend' in changes) {
      this.options = this.charts.buildMedalsPieOptions(this.countries);
      if (this.options) {
        if (!this.showLegend) {
          this.options.legend = undefined;
        }
      }
    }
  }
  onChartInit(ec: ECharts) {
    ec.on('click', (params: ECElementEvent) => {
      const { country } = params.data as MedalPieData;
      this.router.navigate(['/countries', country.id], {
        state: { country },
      });
    });
}
}
