import LogIn from "../pages/Login";
import { RouteLists } from "./routes";
import { Routes, Route } from "react-router-dom";

export const RenderRoutes = () => {
  //If there is a token in our localstorage, we know there is a user logged in. Others, users need to log in.
  //Question? Should we need to check a token or user information?
  let auth = localStorage.getItem("Token") ? true : false;
  return (
    <Routes>
      {RouteLists.map((routes, index) => {
        if (routes.isPrivate && auth) {
          return (
            <Route key={index} path={routes.path} element={routes.element} />
          );
        } else if (!routes.isPrivate) {
          return (
            <Route key={index} path={routes.path} element={routes.element} />
          );
        } else return <Route key={index} path="/login" element={<LogIn />} />;
      })}
    </Routes>
  );
};
