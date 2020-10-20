interface pageConfig {
  url: string;
  title: string;
}
const login: pageConfig = {
  url: 'login',
  title: 'Sportscred - Login',
};
const register: pageConfig = {
  url: 'register',
  title: 'Sportscred - Register',
};
const zone: pageConfig = {
  url: 'zone',
  title: 'Sportscred - Zone',
};
const trivia: pageConfig = {
  url: 'trivia',
  title: 'Sportscred - Trivia',
};
const profile: pageConfig = {
  url: 'profile',
  title: 'Sportscred - Profile',
};

export const all_routes = {
  profile,
  login,
  register,
  zone,
  trivia,
};
