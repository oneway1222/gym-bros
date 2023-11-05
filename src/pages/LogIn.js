import React from "react";
import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    e.target.id === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    axios
      .post("http://localhost:3000/auth/sign_in", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log("resp from sign in endpoint", response);
      })
      .catch((error) => {
        console.error(error);
      });

    e.preventDefault();
    console.log(email, password);
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
