import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {

  constructor(private location: Location) {}

  goBack() {
    this.location.back(); // 👈 retourne à la page précédente
  }
}
