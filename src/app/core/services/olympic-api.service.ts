import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({ providedIn: 'root' })
export class OlympicApiService {
  private readonly olympicUrl = 'assets/mock/olympic.json';

  // undefined = en cours de chargement, null = échec, array = OK
  private readonly olympicsSubject =
    new BehaviorSubject<OlympicCountry[] | null | undefined>(undefined);

  readonly olympics$ = this.olympicsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** A appeler au boot (ex: dans AppComponent ou Resolver) */
  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((countries) => this.olympicsSubject.next(countries)),
      catchError((error) => {
        console.error('Failed to load olympics', error);
        this.olympicsSubject.next(null);
        // On termine le flux proprement (pas de resubscribe infini)
        return EMPTY; // ou: return of(null) si tu veux continuer le pipe
      })
    );
  }

  /** Accès lecture seule au state courant */
  getOlympics() {
    return this.olympics$;
  }
}
