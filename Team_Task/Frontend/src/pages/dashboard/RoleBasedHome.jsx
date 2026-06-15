import { Navigate } from "react-router";
import AdminHome from "../admin/AdminHome";
import ManagerHome from "../projectManager/ManagerHome";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import EngineerHome from "../engineer/EngineerHome";

const RoleBasedHome=()=> {
const {userAuth} = useContext(AuthContext);

  switch (userAuth?.role) {
    case 'Admin':
      return <AdminHome />;

    case 'Project Manager':
      return <ManagerHome />;

    case 'Engineer':
      return <EngineerHome/>;

    default:
      return <Navigate to="/signin" />;
  }

}

export default RoleBasedHome;