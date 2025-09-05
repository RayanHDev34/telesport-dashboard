// src/app/core/services/chart-builder.service.ts
import { Injectable } from '@angular/core';
import { OlympicCountry } from '../models/Olympic';

@Injectable({ providedIn: 'root' })
export class ChartBuilderService {
  /** Transforme la liste de pays en données utilisables par la Pie */
  private toMedalsSeriesData(countries: OlympicCountry[]) {
    return countries.map(c => ({
      name: c.country,
      value: c.getTotalMedals(),
    }));
  }

  /** Construit les options ECharts pour afficher un donut avec labels dehors */
  buildMedalsPieOptions(countries: OlympicCountry[]) {
    return {
      tooltip: {
        trigger: 'item',
        formatter: (p: any) => `${p.name}<br/>${p.value} medals`,
      },
      series: [
        {
          name: 'Medals',
          type: 'pie',
          radius: ['42%', '72%'], // donut
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'outside', // 👈 labels dehors
            formatter: '{b}',    // affiche le nom du pays
          },
          labelLine: {
            show: true,          // 👈 active les lignes guides
            length: 14,
            length2: 20,
          },
          emphasis: {
            label: { show: true, fontSize: 16, fontWeight: 'bold' },
          },
          data: this.toMedalsSeriesData(countries),
        },
      ],
    };
  }
}
