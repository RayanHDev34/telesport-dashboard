import { EChartsOption } from 'echarts';
import { Injectable } from '@angular/core';
import { OlympicCountry } from '../../models/olympic.models';
import type { CallbackDataParams } from 'echarts/types/dist/shared';
import { ParticipationsStatsService } from '../stats/participations-stats.service';


@Injectable({ providedIn: 'root' })
export class LineChartBuilderService {
  constructor(private participationsStatsService: ParticipationsStatsService) {}

  buildMedalsLineOptions(country: OlympicCountry): EChartsOption {
    const data = this.participationsStatsService.getMedalsOverTime(country.participations);

    const years = data.map(d => d.year);
    const medals = data.map(d => d.medals);

    return {
      tooltip: {
        trigger: 'axis',
         formatter: (params: CallbackDataParams | CallbackDataParams[]): string => {
          const arr = Array.isArray(params) ? params : [params];
          const p = arr[0];
          return `${p.name}<br/>${p.data} médailles`;
        }
      },
      xAxis: {
        type: 'category',
        data: years,
        name: 'Dates',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'value',
        name: 'Médailles',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          data: medals,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3 }
        }
      ],
      media: [
        {
          query: { maxWidth: 480 },
          option: {
            series: [{ symbolSize: 5, lineStyle: { width: 2 } }]
          }
        }
      ]
    };
  }
}
