interface pageConfig {
  url: string;
  title: string;
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
const trivia: pageConfig = {
  url: 'trivia',
  title: 'SPORTCRED - Trivia',
};
const profile: pageConfig = {
  url: 'profile',
  title: 'SPORTCRED - Profile',
};

export const all_routes = {
  profile,
  login,
  register,
  zone,
  trivia,
};
