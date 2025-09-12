import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlympicCountry } from 'src/app/core/models/Olympic';

import { ParticipationsService } from 'src/app/core/services/participations.service';

import { StatCardComponent } from 'src/app/shared/components/stat-card/stat-card.component';
import { MedalsLineChartComponent } from 'src/app/shared/components/medals-line-chart/medals-line-chart.component';


@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, StatCardComponent, MedalsLineChartComponent ],
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent {
  country!: OlympicCountry;
  medals!: number;
  entries!: number;
  athletes!: number;
  
  constructor(private router: Router, private participations: ParticipationsService) {
    // 👉 récupérer l'objet envoyé dans router.navigate(..., { state: { country } })
    const nav = this.router.getCurrentNavigation();
    this.country = nav?.extras.state?.['country'] ?? null;
    console.log(this.country);
  }

  ngOnInit() {
    this.entries = this.participations.getTotalEntries(this.country.participations)!;
    this.medals = this.participations.getTotalMedals(this.country.participations)!;
    this.athletes = this.participations.getTotalAthletes(this.country.participations)!;
  }

}
