import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav style="background:#2c3e50;padding:10px;color:white">
      <a routerLink="/teams" style="margin-right:15px;color:white;text-decoration:none;">Equipos</a>
      <a routerLink="/standings" style="color:white;text-decoration:none;">Tabla</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
