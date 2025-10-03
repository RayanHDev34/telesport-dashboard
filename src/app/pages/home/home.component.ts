import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlympicCountry } from 'src/app/core/models/olympic.models';

import { OlympicApiService } from 'src/app/core/services/olympic-api.service';
import { OlympicStatsService } from 'src/app/core/services/olympic-stats.service';

import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { MedalsPieChartComponent } from '../../shared/components/medals-pie-chart/medals-pie-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StatCardComponent, MedalsPieChartComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {
  olympics$ = this.olympicApiService.getOlympics();
  constructor(
    private olympicApiService: OlympicApiService,
    private statsService: OlympicStatsService
  ) {}

  getTotalCountries(countries: OlympicCountry[] | null | undefined) {
    return this.statsService.getTotalCountries(countries);
  }

  getTotalJOs(countries: OlympicCountry[] | null | undefined) {
    return this.statsService.getTotalJOs(countries);
  }
}
