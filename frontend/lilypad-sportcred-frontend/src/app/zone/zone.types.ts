export interface Team {
  id: number;
  full_name: string;
  short_name: string;
  plays_sport: Sport;
}
export interface Sport {
  id: number;
  name: string;
}

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  plays_on: Team[];
}
