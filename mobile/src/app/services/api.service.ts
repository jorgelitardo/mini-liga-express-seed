import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api'; // tu backend Laravel

  constructor(private http: HttpClient) {}

  /** Obtener equipos */
  getEquipos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/teams`);
  }

  /** Crear equipo (si lo usas en otro módulo) */
  createEquipo(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/teams`, data);
  }

  /** Obtener partidos (juegos) */
  getPartidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/games`);
  }

  /** Crear nuevo partido */
  createPartido(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/games`, data);
  }

  /** Actualizar resultado del partido */
  updateResultado(
    id: number,
    result: { home_score: number | null; away_score: number | null }
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/matches/${id}/result`, result);
  }
  
  /** Obtener tabla de posiciones */
  getStandings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/standings`);
  }
}
