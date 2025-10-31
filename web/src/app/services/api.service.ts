import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo, Partido, TablaPosicion } from '../models/league.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // === EQUIPOS ===
  getTeams(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.baseUrl}/teams`);
  }

  createTeam(data: Partial<Equipo>): Observable<any> {
    return this.http.post(`${this.baseUrl}/teams`, data);
  }

  // === PARTIDOS ===
  getGames(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.baseUrl}/games`);
  }

  createGame(data: Partial<Partido>): Observable<any> {
    return this.http.post(`${this.baseUrl}/games`, data);
  }

  // === TABLA DE POSICIONES ===
  getStandings(): Observable<TablaPosicion[]> {
    return this.http.get<TablaPosicion[]>(`${this.baseUrl}/standings`);
  }
}
