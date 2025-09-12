import { Injectable } from '@angular/core';
import { OlympicCountry } from '../models/Olympic';
import { ParticipationsService } from './participations.service';

@Injectable({ providedIn: 'root' })
export class ChartLineBuilderService {
  constructor(private participationsService: ParticipationsService) {}

  buildMedalsLineOptions(country: OlympicCountry) {
    // On récupère [{ year, medals }]
    const data = this.participationsService.getMedalsOverTime(country.participations);

    // Séparation en deux tableaux pour ECharts
    const years = data.map(d => d.year);
    const medals = data.map(d => d.medals);

    return {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const p = params[0];
          return `${p.axisValue}<br/>${p.data} médailles`;
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
