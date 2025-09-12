import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
import { LoadState } from '../models/load-state';


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
      this.olympicsSubject.next({ status: 'error', error: err });
      return EMPTY;
    })
  );
  }

  getOlympics() {
    return this.olympics$;
  }
}
