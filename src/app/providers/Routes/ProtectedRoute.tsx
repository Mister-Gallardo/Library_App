import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem("token");

  return token ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
