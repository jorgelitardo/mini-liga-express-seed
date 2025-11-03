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
    home_team_name?: string;
    away_team_name?: string;
    match_date: string;
    stadium?: string;
    home_score?: number | null;
    away_score?: number | null;
    status?: string;
  }
  