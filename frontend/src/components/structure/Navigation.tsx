import { Route, Routes } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import Home from "../home";
import Private from "../private";
import SignUp from "../signup";
import { Link } from "@nextui-org/react";
import Login from "../login";

export const nav: navType[] = [
  { path: "/", name: "Home", element: <Home />, isMenu: true, isPrivate: false },
  { path: "/private", name: "Private", element: <Private />, isMenu: true, isPrivate: true },
  { path: "/sign-up", name: "Sign up", element: <SignUp />, isMenu: false, isPrivate: false },
  { path: "/login", name: "Login", element: <Login />, isMenu: false, isPrivate: false },
];

export const RenderRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && isLoggedIn) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else if (!r.isPrivate) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else return false;
      })}
    </Routes>
  );
};

export const RenderMenu = () => {
  const { isLoggedIn, logout } = useAuth();

  const MenuItem = ({ r }: { r: navType }) => {
    return (
      <div>
        <Link href={r.path}>{r.name}</Link>
      </div>
    );
  };
  return (
    <div className="flex items-center gap-4">
      {nav.map((r, i) => {
        if (!r.isPrivate && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else if (isLoggedIn && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else return false;
      })}

      {isLoggedIn ? (
        <div>
          <Link href="/" onClick={logout}>
            Log out
          </Link>
        </div>
      ) : (
        <div>
          <Link href="/login" className="">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};
