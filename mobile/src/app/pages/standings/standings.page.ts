import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-standings',
  standalone: true,
  templateUrl: './standings.page.html',
  styleUrls: ['./standings.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class StandingsPage {
  tabla: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarTabla();
  }

  cargarTabla() {
    this.api.getStandings().subscribe({
      next: (data) => (this.tabla = data),
      error: (err) => console.error('Error cargando tabla', err),
    });
  }
}
