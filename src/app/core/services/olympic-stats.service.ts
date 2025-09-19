import { Injectable } from '@angular/core';
import { OlympicCountry } from '../models/olympic.models';

@Injectable({ providedIn: 'root' })
export class OlympicStatsService {
  getTotalCountries(countries: OlympicCountry[] | null | undefined): number | null {
    return countries ? countries.length : null;
  }

  getTotalJOs(countries: OlympicCountry[] | null | undefined): number | null {
    if (!countries) return null;
    const years = new Set<number>();
    countries.forEach(c => c.participations.forEach(p => years.add(p.year)));
    return years.size;
  }

  getMedalsByCountry(countries: OlympicCountry[] | null | undefined) {
    return (countries ?? []).map(c => ({
      country: c,
      name: c.country,
      value: c.participations.reduce((acc, p) => acc + p.medalsCount, 0),
    }));
  }
}
