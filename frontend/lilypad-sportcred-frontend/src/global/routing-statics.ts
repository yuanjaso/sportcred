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

export const all_routes = {
  login,
  register,
  zone,
};
