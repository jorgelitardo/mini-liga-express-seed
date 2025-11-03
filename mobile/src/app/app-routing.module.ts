import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'matches',
    pathMatch: 'full'
  },
  {
    path: 'matches',
    loadComponent: () => import('./pages/matches/matches.page').then(m => m.MatchesPage)
  },
  {
    path: 'standings',
    loadComponent: () => import('./pages/standings/standings.page').then(m => m.StandingsPage)
  },
  {
    path: 'teams',
    loadComponent: () => import('./pages/teams/teams.page').then(m => m.TeamsPage)
  },
  {
    path: 'report-result',
    loadComponent: () => import('./pages/report-result/report-result.page').then(m => m.ReportResultPage)
  },
  // fallback para rutas no encontradas
  {
    path: '**',
    redirectTo: 'matches'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
