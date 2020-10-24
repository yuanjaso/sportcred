export const questionTypes = {
  quantitative: 'QN',
  qualitative: 'QL',
  sports: 'S',
  teams: 'T',
  players: 'P',
  custom: 'C',
};
export interface question {
  id: number;
  question_content: string;
  //question_type's type is 'QN' | 'QL' ..., pulls from the VALUES of questionTypes
  question_type: typeof questionTypes[keyof typeof questionTypes];
  // min int, max int are only applicable if question is quantitative (QN)
  // (is_qualitative is false)
  min_int?: number;
  max_int?: number;
  //options is only applicable to CUSTOM questions
  //it defines the custom allowed responses
  options?: customAnswerOption[];
}
export interface customAnswerOption {
  id: number;
  custom_answer: number | string;
}

export interface answer {
  question_id: number;
  answer: number | string;
}
export interface generalRegistrationInfo {
  username: string;
  email: string;
  password: string;
}
export interface questionaireRegistrationInfo {
  questionaire: answer[];
}
export interface loginInfo {
  username: string;
  password: string;
}
