interface pageConfig {
  url: string;
  title: string;
}
interface dashPageConfig extends pageConfig {
  dashTitle: string;
  dashImgLink: string;
}
const login: pageConfig = {
  url: 'login',
  title: 'SPORTCRED - Login',
};
const register: pageConfig = {
  url: 'register',
  title: 'SPORTCRED - Register',
};
const zone: pageConfig = {
  url: 'zone',
  title: 'SPORTCRED - Zone',
};
const profile: pageConfig = {
  url: 'profile',
  title: 'SPORTCRED - Profile',
};
const trivia: dashPageConfig = {
  url: 'trivia',
  title: 'SPORTCRED - Trivia',
  dashTitle: 'Trivia',
  dashImgLink: '../../assets/dashboard_Trivia.png'
};
const debate: dashPageConfig = {
  url: 'debate',
  title: 'SPORTCRED - Analyze & Debate',
  dashTitle: 'Analyze & Debate',
  dashImgLink: '../../assets/dashboard_AD.png'
};
const predictions: dashPageConfig = {
  url: 'predictions',
  title: 'SPORTCRED - Picks & Predictions',
  dashTitle: 'Picks & Predictions',
  dashImgLink: '../../assets/dashboard_PP.png'
};
const open_court: dashPageConfig = {
  url: 'open-court',
  title: 'SPORTCRED - Open Court',
  dashTitle: 'Open Court',
  dashImgLink: '../../assets/dashboard_OC.png'
};

export const all_routes = {
  profile,
  login,
  register,
  zone,
  trivia,
  debate,
  predictions,
  open_court
};
