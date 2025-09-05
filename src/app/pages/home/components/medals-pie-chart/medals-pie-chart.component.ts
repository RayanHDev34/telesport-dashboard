import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { ChartBuilderService } from 'src/app/core/services/chart-builder.service';

@Component({
  selector: 'app-medals-pie-chart',
  standalone: true,                         // 👈 standalone !
  imports: [CommonModule, NgxEchartsModule], // 👈 pas besoin de module parent
  templateUrl: './medals-pie-chart.component.html',
  styleUrls: ['./medals-pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedalsPieChartComponent implements OnChanges {
  @Input() countries: OlympicCountry[] = [];
  @Input() title = 'Medals per Country';
  @Input() showLegend = false;

  options: any | null = null;

  constructor(private charts: ChartBuilderService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('countries' in changes || 'title' in changes || 'showLegend' in changes) {
      this.options = this.charts.buildMedalsPieOptions(this.countries);
      if (this.options) {
        if (!this.showLegend) {
          this.options.legend = undefined;
        }
      }
    }
  }
}
