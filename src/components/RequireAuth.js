import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(`useerrrr : ${user}`);
  return user.email ? (
    <Outlet />
  ) : (
    <Navigate to="/adminLogin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
