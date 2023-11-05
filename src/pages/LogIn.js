import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LogIn = () => {
  const { state } = useLocation();

  const [email, setEmail] = useState(state?.email || "");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    e.target.id === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/sign_in", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log("resp from sign in endpoint", response);
        localStorage.setItem("Token", JSON.stringify(response.data.token))
        localStorage.setItem("User", JSON.stringify(response.data.user))
        // navigate to main page!
      })
      .catch((error) => {
        console.error(error);
      });
 
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Enter your email"
          required
          onChange={onChange}
        />
        <br />
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Enter your password"
          required
          pattern="(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}" //Password contains at least one symbol, number, upper case letter and lower case letter with minimum 8 lengths
          onChange={onChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p>You don't have an account?</p>
      <Link to="/signup">Creat an account </Link>
    </div>
  );
};

export default LogIn;
