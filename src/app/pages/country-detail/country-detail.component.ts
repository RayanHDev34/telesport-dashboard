import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent {
  country: OlympicCountry | null = null;
  totalMedals = 0;

  constructor(private router: Router) {
    // 👉 récupérer l'objet envoyé dans router.navigate(..., { state: { country } })
    const nav = this.router.getCurrentNavigation();
    this.country = nav?.extras.state?.['country'] ?? null;
    console.log('Country detail for:', this.country);
    if (this.country) {
      this.totalMedals = this.country.participations.reduce(
        (acc, p) => acc + p.medalsCount,
        0
      );
    }
  }
}
