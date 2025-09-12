import { Injectable } from '@angular/core';
import { Participation } from '../models/Participation';

@Injectable({ providedIn: 'root' })
export class ParticipationsService {

  getMedalsOverTime(participations: Participation[]) {
    return participations.map(p => ({
      year: p.year,
      medals: p.medalsCount
    }));
  }

  /** Retourne le nombre total de participations */
  getTotalEntries(participations: Participation[] | null | undefined): number | null {
    return participations ? participations.length : null;
  }

  /** Retourne le nombre total de médailles */
  getTotalMedals(participations: Participation[] | null | undefined): number | null {
    if (!participations) return null;
    return participations.reduce((acc, p) => acc + p.medalsCount, 0);
  }

  /** Retourne le nombre total d’athlètes */
  getTotalAthletes(participations: Participation[] | null | undefined): number | null {
    if (!participations) return null;
    return participations.reduce((acc, p) => acc + p.athleteCount, 0);
  }
}
