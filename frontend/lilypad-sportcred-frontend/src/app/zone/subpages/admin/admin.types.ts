import { Question, QuestionType } from 'src/app/login/login.types';

export interface GroupedQuestions {
  [key: string]: Question[];
}
export interface QuestionnaireResponse {
  user: {
    id: number;
    username: string;
    is_superuser: boolean;
  };
  question: {
    id: number;
    question_content: string;
    question_type: QuestionType;
    max_int: number;
    min_int: number;
  };
  answer:
    | number
    | string
    | {
        id: number;
        custom_answer: string;
        question: number;
      }
    | { id: number; name: string };
}

export interface PostDebate {
  title: string;
  content: string;
  sport: number;
  acs_rank: string;
}
