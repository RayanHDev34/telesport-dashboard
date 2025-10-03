import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlympicCountry } from 'src/app/core/models/olympic.models';

import { ParticipationsStatsService } from 'src/app/core/services/stats/participations-stats.service';

import { StatCardComponent } from 'src/app/shared/components/stat-card/stat-card.component';
import { MedalsLineChartComponent } from 'src/app/pages/country-detail/medals-line-chart/medals-line-chart.component';
import { BackHeaderComponent } from 'src/app/shared/components/back-header/back-header.component';


@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, StatCardComponent, MedalsLineChartComponent, BackHeaderComponent ],
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent {
  country!: OlympicCountry;
  medals!: number;
  entries!: number;
  athletes!: number;

  constructor(private router: Router, private participations: ParticipationsStatsService) {
    const nav = this.router.getCurrentNavigation();
    this.country = nav?.extras.state?.['country'] ?? null;
  }

  ngOnInit() {
    this.entries = this.participations.getTotalEntries(this.country.participations)!;
    this.medals = this.participations.getTotalMedals(this.country.participations)!;
    this.athletes = this.participations.getTotalAthletes(this.country.participations)!;
  }

}
