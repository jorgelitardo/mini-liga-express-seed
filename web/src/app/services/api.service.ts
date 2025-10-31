import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Ajusta si usas otro puerto

  constructor(private http: HttpClient) {}

  getTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/teams`);
  }

  getStandings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/standings`);
  }
}
