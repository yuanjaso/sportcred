interface pageConfig {
  url: string;
  title: string;
}
const login: pageConfig = {
  url: 'login',
  title: 'Sportcred - Login',
};
const register: pageConfig = {
  url: 'register',
  title: 'Sportcred - Register',
};
const zone: pageConfig = {
  url: 'zone',
  title: 'Sportcred - Zone',
};
const trivia: pageConfig = {
  url: 'trivia',
  title: 'Sportcred - Trivia',
};
const profile: pageConfig = {
  url: 'profile',
  title: 'Sportcred - Profile',
};

export const all_routes = {
  profile,
  login,
  register,
  zone,
  trivia,
};
