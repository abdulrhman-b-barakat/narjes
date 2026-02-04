import { Navigate, Outlet } from "react-router-dom";
import authToken from "../utils/authToken";

const ProtectedRoute = () => {
  const token = authToken();
  console.log(token)

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
