import LogIn from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Workout from "../pages/Workout";

export const RouteLists = [
  { path: "/", element: <Home />, isPrivate: false },
  { path: "/login", element: <LogIn />, isPrivate: false },
  { path: "/signup", element: <SignUp />, isPrivate: false },
  { path: "/workout", element: <Workout />, isPrivate: true },
];