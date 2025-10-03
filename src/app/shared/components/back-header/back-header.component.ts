import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './back-header.component.html',
  styleUrls: ['./back-header.component.scss'],
})
export class BackHeaderComponent {

  constructor(private location: Location) {}

  goBack() {
    this.location.back(); // 👈 retourne à la page précédente
  }
}
