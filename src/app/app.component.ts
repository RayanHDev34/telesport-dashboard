import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicApiService } from './core/services/olympic-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private OlympicApiService: OlympicApiService) {}

  ngOnInit(): void {
    this.OlympicApiService.loadInitialData().pipe(take(1)).subscribe();
  }
}
