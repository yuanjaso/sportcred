export interface question {
  id: number;
  question_content: String;
  is_qualitative: boolean;
  min_int?: number;
  max_int?: number;
}
export interface registrationInfo {
  username: string;
  email: string;
  password: string;
}
export interface loginInfo {
  email: string;
  password: string;
}
