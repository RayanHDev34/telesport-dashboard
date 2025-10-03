import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../../models/olympic.models';
import { LoadState } from '../../models/load-state.models';

export function getErrorMessage(err: HttpErrorResponse): string {
  if (err.status === 0) return 'Impossible de contacter le serveur';
  if (err.status === 404) return 'Ressource non trouvée';
  if (err.status === 500) return 'Erreur interne du serveur';
  return err.message || 'Erreur inconnue';
}

  @Injectable({ providedIn: 'root' })
export class OlympicApiService {
  private readonly olympicUrl = 'assets/mock/olympic.json';

  private olympicsSubject =
  new BehaviorSubject<LoadState<OlympicCountry[]>>({ status: 'loading' });

  readonly olympics$ = this.olympicsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadInitialData() {
   return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
    tap(countries => this.olympicsSubject.next({ status: 'success', data: countries })),
    catchError(err => {
      const errorMessage = getErrorMessage(err);
      this.olympicsSubject.next({ status: 'error', error: errorMessage });
      return EMPTY;
    })
  );
  }

  getOlympics() {
    return this.olympics$;
  }
}
