import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OlympicCountry } from 'src/app/core/models/Olympic';

import { OlympicApiService } from 'src/app/core/services/olympic-api.service';
import { OlympicStatsService } from 'src/app/core/services/olympic-stats.service';

import { StatCardComponent } from './components/stat-card/stat-card.component';
import { MedalsPieChartComponent } from './components/medals-pie-chart/medals-pie-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StatCardComponent, MedalsPieChartComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  olympics$: Observable<OlympicCountry[] | null | undefined> = of(undefined);

  totalCountries$!: Observable<number | null>;
  totalJOs$!: Observable<number | null>;

  constructor(private olympicApiService: OlympicApiService, private statsService: OlympicStatsService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicApiService.getOlympics();

   this.totalCountries$ = this.statsService.getTotalCountries(this.olympics$);
   this.totalJOs$ = this.statsService.getTotalJOs(this.olympics$);
  }
}
