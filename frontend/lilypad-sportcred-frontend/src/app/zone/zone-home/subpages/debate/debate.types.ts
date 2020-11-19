export enum PlayerRank {
  EXPERT_ANALYST = 'E',
  PRO_ANALYST = 'P',
  ANALYST = 'A',
  FANALYST = 'F',
}
export interface DebateTopic {
  id: number;
  acs_rank: PlayerRank;
  sport: number;
  title: string;
  content: string;
  post_date: string;
  num_of_comments: number;
}

export interface DebateComment {
  user: { id: number; username: string };
  comment_id: number;
  debate_id: number;
  content: string;
  average_rating: number;
  number_of_ratings: number;
  comment_date: string;
}
export interface PostDebate {
  title: string;
  content: string;
  sport: number;
  acs_rank: string;
}
