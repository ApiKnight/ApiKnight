import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

import { ReactNode } from "react";

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const auth = useAuth();
  console.log(auth);
  return auth ? children : <Navigate to="/user/login" />;
};

export default AuthRoute;
