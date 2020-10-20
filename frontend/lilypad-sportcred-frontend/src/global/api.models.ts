import { environment } from '../environments/environment';

export const loginURL = environment.urlProcessor('users/login');
export const usersURL = environment.urlProcessor('users/users');
export const questionaireURL = environment.urlProcessor('questionnaire');
