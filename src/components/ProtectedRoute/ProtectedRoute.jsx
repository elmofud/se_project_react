import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isLoading, children }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoute;
