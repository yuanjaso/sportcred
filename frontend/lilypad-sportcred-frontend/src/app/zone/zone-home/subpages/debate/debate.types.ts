export enum playerRank {
  EXPERT_ANALYST = 'E',
  PRO_ANALYST = 'P',
  ANALYST = 'A',
  FANALYST = 'F',
}
export interface DebateTopic {
  id: boolean;
  acs_rank: playerRank;
  sport: number;
  tite: string;
  content: string;
  post_date: string;
  num_of_comments: number;
}
export interface DebateDiscussion {
  todo: any;
}
