import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Component, Input, OnChanges } from '@angular/core';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { ChartLineBuilderService } from 'src/app/core/services/chart-line-builder.service';

@Component({
  selector: 'app-medals-line-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './medals-line-chart.component.html',
  styleUrls: ['./medals-line-chart.component.scss']
})
export class MedalsLineChartComponent implements OnChanges {
  @Input() country!: OlympicCountry;

  options: EChartsOption | null = null;


  constructor(private chartLineBuilder: ChartLineBuilderService) {}

  ngOnChanges(): void {
    if (this.country) {
      this.options = this.chartLineBuilder.buildMedalsLineOptions(this.country);
    }
  }
}
