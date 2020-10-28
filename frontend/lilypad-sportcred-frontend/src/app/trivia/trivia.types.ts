export interface TriviaQuestions {
  question: any;
  answers: any[];
  correctAnswer: any;
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
