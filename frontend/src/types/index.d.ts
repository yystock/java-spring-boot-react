type userType = {
  username: string;
  email: string;
};

type userArray = {
  id: int;
  userName: string;
  email: string;
}[];

type authContextType = {
  user: userType | {};
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type navType = {
  path: string;
  name: string;
  element: React.ReactNode;
  isMenu: boolean;
  isPrivate: boolean;
};
