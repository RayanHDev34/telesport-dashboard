import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { MedalsPieChartComponent } from 'src/app/components/medals-pie-chart.component';

@Component({
  selector: 'app-home',
  standalone: true, // 👈 standalone aussi
  imports: [CommonModule, MedalsPieChartComponent], // 👈 j’importe directement le chart
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[] | null | undefined> = of(undefined);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
}
