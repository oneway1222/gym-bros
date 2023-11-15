import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  //If there is a token in our localstorage, we know there is a user logged in. Others, users need to log in.
  // Question? Should we need to check a token or user information?
  let auth = localStorage.getItem("Token") ? true : false;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
