import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  //If there is a token in our localstorage, we know there is a user logged in. Others, users need to log in.
  // Question? Should we need to check a token or user information?
  let auth = localStorage.getItem("Token") ? true : false;
  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
