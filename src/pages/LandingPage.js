import React from "react";
import Start from "../workout/Start";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <nav>
      <Link to="/login">Log In</Link> |
      <Link to="/signup">Sign Up</Link>
    </nav>
  );
};

export default LandingPage;
