export const loginURL = 'users/login';
export const usersURL = 'users';
export const questionaireURL = 'questionnaire';
export const questionaireResponseURL = (id) =>
  `${questionaireURL}/${id}/responses`;
export const teamsURL = 'teams';
export const playersURL = 'players';
export const sportsURL = 'sports';
export const profileURL = 'profile';
export const profileACSHistoryURL = (id) => `${profileURL}/${id}/acs_history`;
export const profilePictureURL = `${profileURL}/picture`;
