// @deprecated
export interface TriviaQuestions {
  question: any;
  answers: any[];
  correctAnswer: any;
}

export interface User {
  id: number;
  username: string;
}

export interface TriviaInstance {
  id: number;
  user: User;
  other_user?: User;
  is_completed: boolean;
  date: string;
  sport: { id: number; name: string };
  questions: TriviaQuestion[];
  score: string | null;
  creation_date: string;
}

export interface Answer {
  id: number;
  content: string;
}
export interface TriviaQuestion {
  id: number;
  content: string;
  correct_answer: Answer;
  answers: Answer[];
}

// the payload after the trivia match is over
export interface TriviaResults {
  start_time: string;
  trivia_instance: number;
  questions: {
    id: number;
    submission_answer: number;
    start_time: string;
    submission_time: string;
  }[];
}
