export enum QuestionType {
  quantitative = 'QN',
  qualitative = 'QL',
  sports = 'S',
  teams = 'T',
  players = 'P',
  custom = 'C',
}
export interface Question {
  id: number;
  question_content: string;
  //question_type's type is 'QN' | 'QL' ..., pulls from the VALUES of questionTypes
  question_type: QuestionType;
  // min int, max int are only applicable if question is quantitative (QN)
  // (is_qualitative is false)
  min_int?: number;
  max_int?: number;
  //options is only applicable to CUSTOM questions
  //it defines the custom allowed responses
  options?: CustomAnswerOption[];
}
export interface CustomAnswerOption {
  id: number;
  custom_answer: number | string;
}

export interface Answer {
  question_id: number;
  answer: number | string;
}
export interface GeneralRegistrationInfo {
  username: string;
  email: string;
  password: string;
}
export interface QuestionaireRegistrationInfo {
  questionaire: Answer[];
}
export interface LoginInfo {
  username: string;
  password: string;
}
