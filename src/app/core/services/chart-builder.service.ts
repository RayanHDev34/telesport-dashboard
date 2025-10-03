import { EChartsOption } from 'echarts';
import { Injectable } from '@angular/core';
import { OlympicCountry } from '../models/olympic.models';
import { OlympicStatsService } from './olympic-stats.service';
import { CallbackDataParams } from 'echarts/types/dist/shared';

@Injectable({ providedIn: 'root' })
export class ChartBuilderService {
  constructor(private stats: OlympicStatsService) {}
private getColorForCountry(id: number): string {
  const colors: Record<number, string> = {
    1: '#a4005dda',   
    2: '#2d4fdbff',      
    5: '#2e83c8ff',    
    4: '#8f1a1ab4',  
    3: '#1b21c1b4',  
  };
  return colors[id] || '#cccccc'; // couleur par défaut
}
  buildMedalsPieOptions(countries: OlympicCountry[]): EChartsOption {
  const data = this.stats.getMedalsByCountry(countries).map(item => ({
  ...item,
  itemStyle: {
    color: this.getColorForCountry(item.country.id)  // 👈 couleur personnalisée
  }
}));
  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: CallbackDataParams | CallbackDataParams[]): string=> {
        const p = Array.isArray(params) ? params[0] : params;
        return `${p.name}<br/>${p.value} medals`;
      },
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
