import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { MedalsPieChartComponent } from './components/medals-pie-chart/medals-pie-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StatCardComponent, MedalsPieChartComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  olympics$: Observable<OlympicCountry[] | null | undefined> = of(undefined);

  totalCountries$!: Observable<number | null>;
  totalJOs$!: Observable<number | null>;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.totalCountries$ = this.olympics$.pipe(
      map(data => Array.isArray(data) ? data.length : (data === null ? null : null))
    );

    this.totalJOs$ = this.olympics$.pipe(
      map(data => {
        if (!Array.isArray(data)) return data === null ? null : null;
        const years = new Set<number>();
        data.forEach(c => c.participations.forEach(p => years.add(p.year)));
        return years.size;
      })
    );
  }
}
