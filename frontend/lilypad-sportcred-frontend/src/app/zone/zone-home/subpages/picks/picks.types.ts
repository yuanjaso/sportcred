export type PredictionResults = {
  year: number;
  // ! hardcoded for obvious purposes
  sport: 'Basketball';
  playoff?: { id: number; team: number }[];
  mvp?: { id: number; player: number };
  rookie?: { id: number; player: number };
};

export type PlayoffRound =
  | 'east_first_round-1-8'
  | 'east_first_round-2-7'
  | 'east_first_round-3-6'
  | 'east_first_round-4-5'
  | 'west_first_round-1-8'
  | 'west_first_round-2-7'
  | 'west_first_round-3-6'
  | 'west_first_round-4-5'
  | 'east_second_round_A'
  | 'east_second_round_B'
  | 'west_second_round_A'
  | 'west_second_round_B'
  | 'east_conference_finals'
  | 'west_conference_finals'
  | 'finals';

export type PlayoffPrediction = {
  id: number;
  title: PlayoffRound;
  is_locked: boolean;
  // this is the id of the team that the user selected, null if not selected yet
  team: number | null;
  // updated by the admin when the outcome is available
  correct_team: number | null;
};

// ? left this as an interface as this might be something worth extending later
export interface Award {
  id: number;
  title: string;
  is_locked: boolean;
  player: null | number;
  correct_player: null | number;
}

export type Predictions = {
  year: number;
  sport: string;
  playoff: PlayoffPrediction[];
  mvp: Award;
  rookie: Award;
};
