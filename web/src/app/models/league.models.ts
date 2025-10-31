export interface Equipo {
    id: number;
    name: string;
    goals_for?: number;
    goals_against?: number;
  }
  
  export interface Partido {
    id?: number;
    home_team_id: number;
    away_team_id: number;
    match_date: string;
    stadium?: string;
    home_score?: number | null;
    away_score?: number | null;
    status?: string; // 'Pendiente' o 'Finalizado'
  
    // Campos calculados en frontend
    home_team_name?: string;
    away_team_name?: string;
  }
  
  export interface TablaPosicion {
    team_name: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goals_for: number;
    goals_against: number;
    points: number;
  }
  