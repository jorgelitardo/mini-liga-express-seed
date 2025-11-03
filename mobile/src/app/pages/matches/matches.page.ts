import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DatePipe]
})
export class MatchesPage implements OnInit {
  partidos: any[] = [];
  equipos: any[] = [];

  // Modal de creación de partido
  isNewOpen = false;
  nuevo: any = { home_team_id: null, away_team_id: null };

  // Modal de resultado
  isResultOpen = false;
  partidoSeleccionado: any = null;
  resultado = { home_score: null, away_score: null };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarEquipos();
  }

  cargarEquipos() {
    this.api.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
        this.cargarPartidos();
      },
      error: (err) => console.error('Error cargando equipos', err),
    });
  }

  cargarPartidos() {
    this.api.getPartidos().subscribe({
      next: (data) => {
        this.partidos = data.map((p: any) => {
          const home = this.equipos.find((e) => e.id === p.home_team_id);
          const away = this.equipos.find((e) => e.id === p.away_team_id);
          return {
            ...p,
            home_name: home ? home.name : '—',
            away_name: away ? away.name : '—',
            status: p.home_score != null && p.away_score != null ? 'Finalizado' : 'Pendiente',
          };
        });
      },
      error: (err) => console.error('Error cargando partidos', err),
    });
  }

  // === NUEVO PARTIDO ===
  openNew() {
    this.isNewOpen = true;
  }

  closeNew() {
    this.isNewOpen = false;
  }

  crearPartido() {
    if (!this.nuevo.home_team_id || !this.nuevo.away_team_id) return;

    this.api.createPartido(this.nuevo).subscribe({
      next: () => {
        this.cargarPartidos();
        this.closeNew();
        this.nuevo = { home_team_id: null, away_team_id: null };
      },
      error: (err) => console.error('Error creando partido', err),
    });
  }

  // === REGISTRAR RESULTADO ===
  abrirModalResultado(p: any) {
    this.partidoSeleccionado = p;
    this.resultado = { home_score: null, away_score: null };
    this.isResultOpen = true;
  }

  cerrarModalResultado() {
    this.isResultOpen = false;
  }

  guardarResultado() {
    if (!this.partidoSeleccionado) return;

    this.api.updateResultado(this.partidoSeleccionado.id, this.resultado).subscribe({
      next: () => {
        this.isResultOpen = false;
        this.cargarPartidos();
      },
      error: (err) => console.error('Error guardando resultado', err),
    });
  }
}
