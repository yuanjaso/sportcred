export enum playerRank {
  EXPERT_ANALYST = 'E',
  PRO_ANALYST = 'P',
  ANALYST = 'A',
  FANALYST = 'F',
}
export interface DebateTopic {
  id: number;
  acs_rank: playerRank;
  sport: { id: number; name: string };
  title: string;
  content: string;
  post_date: string;
  num_of_comments: number;
  has_valid_acs: boolean;
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

export type DebatePostCommentPayload = Pick<
  DebateComment,
  'debate_id' | 'content'
>;

export type Rating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface DebateRating {
  comment_id: number;
  rating: Rating;
}
