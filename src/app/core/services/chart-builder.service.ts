// src/app/core/services/chart-builder.service.ts
import { Injectable } from '@angular/core';
import { OlympicCountry } from '../models/Olympic';
import { OlympicStatsService } from './olympic-stats.service';

@Injectable({ providedIn: 'root' })
export class ChartBuilderService {
  constructor(private stats: OlympicStatsService) {}

  /** Construit les options ECharts pour afficher un donut avec labels dehors */
  buildMedalsPieOptions(countries: OlympicCountry[]) {
  const data = this.stats.getMedalsByCountry(countries);
  
  return {
    tooltip: {
      trigger: 'item',
      formatter: (p: any) => `${p.name}<br/>${p.value} medals`,
    },
    series: [
      {
        name: 'Medals',
        type: 'pie',
        radius: ['42%', '72%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}',
          overflow: 'truncate',
        },
        labelLine: {
          show: true,
          length: 14,
          length2: 20,
          smooth: true,
        },
        emphasis: {
          label: { show: true, fontSize: 16, fontWeight: 'bold' },
        },
        data,
      },
    ],

    // 👇 Réglages spécifiques selon la largeur du conteneur
    media: [
      // Mobile
      {
        query: { maxWidth: 480 },
        option: {
          series: [{
            label: { fontSize: 11 },
            labelLine: { length: 8, length2: 12 },
            radius: ['45%', '68%'],
          }],
        },
      },
      // Petites tablettes
      {
        query: { maxWidth: 768 },
        option: {
          series: [{
            label: { fontSize: 12 },
            labelLine: { length: 10, length2: 14 },
            radius: ['44%', '70%'],
          }],
        },
      },
    ],
  };
}

}
