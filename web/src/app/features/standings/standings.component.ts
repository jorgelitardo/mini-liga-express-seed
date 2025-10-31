import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standings.html',
  styleUrls: ['./standings.scss']
})
export class StandingsComponent implements OnInit {
  title = 'Tabla de Posiciones';
  standings: any[] = [];
  errorMsg = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getStandings().subscribe({
      next: (data) => this.standings = data,
      error: (err) => {
        console.error('Error al obtener tabla:', err);
        this.errorMsg = 'Error al conectar con el servidor.';
      }
    });
  }
}
