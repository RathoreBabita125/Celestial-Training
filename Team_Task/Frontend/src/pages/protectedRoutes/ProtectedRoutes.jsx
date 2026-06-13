import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import LoadingCompo from "../../common/Loader";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const {userAuth, loading}=useContext(AuthContext)

  if(loading) return <LoadingCompo/>

  if (!userAuth?.id) {
    return <Navigate to="/signin" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(userAuth?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;