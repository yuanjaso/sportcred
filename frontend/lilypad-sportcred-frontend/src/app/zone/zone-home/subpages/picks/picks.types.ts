export type PredictionResults = {
  year: number;
  // ! hardcoded for obvious purposes
  sport: 'Basketball';
  playoff?: { id: number; team: number }[];
  mvp?: { id: number; player: number };
  rookie?: { id: number; player: number };
};
