export const sportStrings = [
  'Basketball',
  'Baseball',
  'Hockey',
  'Football',
  'Soccer',
];
export type sportTypes = typeof sportStrings;

export interface Team {
  full_name: string;
  short_name: string;
  plays_sport: Sport;
}
export interface Sport {
  id: number;
  name: sportTypes;
}

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  plays_on: Team[];
}
