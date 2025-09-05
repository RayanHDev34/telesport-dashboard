import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[] | null | undefined>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
  return this.http.get<any[]>(this.olympicUrl).pipe(
    map((data) => data.map((country) => OlympicCountry.fromJson(country))),
    tap((countries) => this.olympics$.next(countries)),
    catchError((error, caught) => {
      console.error(error);
      this.olympics$.next(null);
      return caught;
    })
  );
}

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
