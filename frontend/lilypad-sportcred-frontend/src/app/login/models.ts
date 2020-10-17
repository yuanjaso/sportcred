export interface question {
  id: number;
  question_content: String;
  is_qualitative: boolean;
  //min int, max int are only applicable if question is quantitative
  //  (is_qualitative is false)
  min_int?: number;
  max_int?: number;
}
export interface answer {
  question: question;
  answer: number | string;
}
export interface generalRegistrationInfo {
  username: string;
  email: string;
  password: string;
}
export interface questionaireRegistrationInfo {
  answers: answer[];
}
export interface loginInfo {
  email: string;
  password: string;
}
