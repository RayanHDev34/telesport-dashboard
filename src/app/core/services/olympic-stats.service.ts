import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { OlympicCountry } from '../models/Olympic';

@Injectable({ providedIn: 'root' })
export class OlympicStatsService {
  getTotalCountries(olympics$: Observable<OlympicCountry[] | null | undefined>): Observable<number | null> {
    return olympics$.pipe(
      map(data => data ? data.length : null)
    );
  }

  getTotalJOs(olympics$: Observable<OlympicCountry[] | null | undefined>): Observable<number | null> {
    return olympics$.pipe(
      map(data => {
        const years = new Set<number>();
        data?.forEach(c => c.participations.forEach(p => years.add(p.year)));
        return years.size;
      })
    );
  }
    getMedalsByCountry(countries: OlympicCountry[]) {
    return (countries ?? []).map(c => ({
      name: c.country,
      value: c.participations.reduce(
        (acc, p) => acc + p.medalsCount,
        0
      )
    }));
  }
}
