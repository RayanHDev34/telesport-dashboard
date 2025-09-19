import { Injectable } from '@angular/core';
import { OlympicCountry } from '../models/olympic.models';
import { EChartsOption } from 'echarts';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

import { ParticipationsService } from './participations.service';

@Injectable({ providedIn: 'root' })
export class ChartLineBuilderService {
  constructor(private participationsService: ParticipationsService) {}

  buildMedalsLineOptions(country: OlympicCountry): EChartsOption {
    const data = this.participationsService.getMedalsOverTime(country.participations);

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
