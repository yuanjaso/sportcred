export interface TriviaQuestions {
  question: any;
  answers: any[];
  correctAnswer: any;
}

export interface TriviaInstance {
  id: number;
  user: number;
  other_user?: number;
  is_completed: boolean;
  date: string;
  sport: { id: number; name: string };
  questions: TriviaQuestion[];
}

export interface Answer {
  id: number;
  answer_content: string;
}
export interface TriviaQuestion {
  id: number;
  question_content: string;
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
    submission_time: string;
  }[];
}
