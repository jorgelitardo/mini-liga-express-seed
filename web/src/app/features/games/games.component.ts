import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Equipo, Partido } from '../../models/league.models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './games.html',
  styleUrls: ['./games.scss'],
})
export class GamesComponent implements OnInit {
  title = 'Gestión de Partidos ⚽';
  equipos: Equipo[] = [];
  partidos: Partido[] = [];
  partido: Partido = { home_team_id: 0, away_team_id: 0, match_date: '', stadium: '' };
  errorMsg = '';
  successMsg = '';

  private modalInstance: any;

  constructor(private api: ApiService, private http: HttpClient) {}

  ngOnInit() {
    this.api.getTeams().subscribe({
      next: (equipos: Equipo[]) => {
        console.log('Equipos recibidos:', equipos);
        this.equipos = equipos;
        this.cargarPartidos();
      },
      error: (err) => {
        console.error('Error al obtener equipos:', err);
        this.errorMsg = 'Error al cargar equipos.';
      },
    });
  }

  cargarPartidos(): void {
    this.api.getGames().subscribe({
      next: (data: Partido[]) => {
        this.partidos = data
          .map((p) => {
            const homeTeam = this.equipos.find((e) => e.id === p.home_team_id);
            const awayTeam = this.equipos.find((e) => e.id === p.away_team_id);
            const estado =
              p.home_score != null && p.away_score != null ? 'Finalizado' : 'Pendiente';
            return {
              ...p,
              home_team_name: homeTeam?.name || `#${p.home_team_id}`,
              away_team_name: awayTeam?.name || `#${p.away_team_id}`,
              status: estado,
            };
          })
          .sort(
            (a, b) =>
              new Date(b.match_date).getTime() - new Date(a.match_date).getTime()
          );

        console.log('Partidos enriquecidos:', this.partidos);
      },
      error: (err) => {
        console.error('Error al obtener partidos:', err);
        this.errorMsg = 'Error al conectar con el servidor.';
      },
    });
  }

  cargarEquipos(): void {
    this.api.getTeams().subscribe({
      next: (data: Equipo[]) => (this.equipos = data),
      error: (err) => {
        console.error('Error al obtener equipos:', err);
        this.errorMsg = 'Error al cargar equipos.';
      },
    });
  }

  crearPartido(): void {
    if (!this.partido.home_team_id || !this.partido.away_team_id || !this.partido.match_date) {
      this.errorMsg = 'Debe completar todos los campos obligatorios.';
      return;
    }

    if (this.partido.home_team_id === this.partido.away_team_id) {
      this.errorMsg = 'El equipo local y visitante no pueden ser el mismo.';
      return;
    }

    this.api.createGame(this.partido).subscribe({
      next: (res: any) => {
        this.successMsg = res.message || 'Partido creado correctamente.';
        this.errorMsg = '';
        this.cargarPartidos();
        this.resetForm();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al crear partido:', err);
        this.errorMsg = 'No se pudo crear el partido.';
      },
    });
  }

  resetForm(): void {
    this.partido = { home_team_id: 0, away_team_id: 0, match_date: '', stadium: '' };
  }

  openModal(): void {
    const modalEl = document.getElementById('modalPartido');
    if (!modalEl) return;
    const bootstrap = (window as any).bootstrap;
    if (!bootstrap || !bootstrap.Modal) {
      console.error('Bootstrap Modal no está disponible.');
      return;
    }
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    } else {
      const modalEl = document.getElementById('modalPartido');
      const bootstrap = (window as any).bootstrap;
      if (modalEl && bootstrap?.Modal?.getInstance) {
        const instance = bootstrap.Modal.getInstance(modalEl);
        instance?.hide();
      }
    }
  }

  // 🏁 --- NUEVO BLOQUE PARA REGISTRAR RESULTADOS ---
  partidoSeleccionado: any = null;
  resultado = { home_score: 0, away_score: 0 };

  openResultadoModal(partido: any) {
    this.partidoSeleccionado = partido;
    this.resultado = {
      home_score: partido.home_score ?? 0,
      away_score: partido.away_score ?? 0,
    };
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('modalResultado')
    );
    modal.show();
  }

  closeResultadoModal() {
    const modal = (window as any).bootstrap.Modal.getInstance(
      document.getElementById('modalResultado')
    );
    modal?.hide();
  }

  guardarResultado() {
    if (!this.partidoSeleccionado) return;

    const id = this.partidoSeleccionado.id;
    const payload = {
      home_score: this.resultado.home_score,
      away_score: this.resultado.away_score,
    };

    this.http.post(`http://127.0.0.1:8000/api/matches/${id}/result`, payload).subscribe({
      next: (res) => {
        console.log('Resultado guardado:', res);
        this.closeResultadoModal();
        this.successMsg = '✅ Resultado actualizado correctamente';
        this.cargarPartidos(); // Refresca tabla
      },
      error: (err) => {
        console.error('Error al guardar resultado:', err);
        this.errorMsg = '⚠️ Error al registrar resultado.';
      },
    });
  }
}
