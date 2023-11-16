import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState(state?.email || "");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const validateEmail = (inputText) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!inputText || inputText.length == 0) {
      setEmailErrorMessage("Email is required!");
    } else {
      !emailRegex.test(inputText)
        ? setEmailErrorMessage("Envalid email!")
        : setEmailErrorMessage("");
    }
  };

  const onChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
      validateEmail(e.target.value);
    }

    /*e.target.id === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);*/
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
        localStorage.setItem("Token", JSON.stringify(response.data.token));
        localStorage.setItem("User", JSON.stringify(response.data.user));

        navigate("/");
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
          type="text"
          value={email}
          placeholder="Enter your email"
          onChange={onChange}
          onBlur={() => validateEmail(email)}
        />
        <p>{emailErrorMessage}</p>
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
