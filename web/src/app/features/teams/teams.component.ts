import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.html',
  styleUrls: ['./teams.scss']
})
export class TeamsComponent implements OnInit {
  title = 'Gestión de Equipos';
  teams: any[] = [];
  errorMsg: string = ''; // 👈 ESTA LÍNEA ES LA CLAVE

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTeams().subscribe({
      next: (data) => {
        console.log('Equipos recibidos:', data); // 👀 verifica en la consola del navegador
        this.teams = data;
      },
      error: (err) => {
        console.error('Error al obtener equipos:', err);
        this.errorMsg = 'Error al conectar con el servidor.';
      }
    });
  }
  
}
