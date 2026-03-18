import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isLoading, children }) {
  console.log(
    "ProtectedRoute - isLoggedIn:",
    isLoggedIn,
    "isLoading:",
    isLoading,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoute;
