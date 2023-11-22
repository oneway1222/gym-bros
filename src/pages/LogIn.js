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
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

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

  const validatePassword = (inputText) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (!inputText || inputText.length == 0) {
      setPasswordErrorMessage("Password is required!");
    } else {
      !passwordRegex.test(inputText)
        ? setPasswordErrorMessage("Envalid password!")
        : setPasswordErrorMessage("");
    }

    /*    Need to update password validation !
 
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(inputText)) {
      setPasswordErrorMessage("Password must not contain Whitespaces.")
    }
  
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(inputText)) {
      setPasswordErrorMessage("Password must have at least one Uppercase Character.")
    }
      
    
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(inputText)) {
      setPasswordErrorMessage("Password must have at least one Lowercase Character.")
    }
  
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(inputText)) {
      setPasswordErrorMessage("Password must contain at least one Digit.")
    }
  
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(inputText)) {
      setPasswordErrorMessage("Password must contain at least one Special Symbol.")
    }
  
    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(inputText)) {
      setPasswordErrorMessage("Password must be 10-16 Characters Long.")
    }

    else{
      setPasswordErrorMessage("")

    }
 
  */
  };

  const onChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
      validateEmail(e.target.value);
    } else {
      setPassword(e.target.value);
      validatePassword(e.target.value);
    }
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
          onChange={onChange}
          onBlur={() => validatePassword(password)}
        />
        <p>{passwordErrorMessage}</p>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p>You don't have an account?</p>
      <Link to="/signup">Creat an account </Link>
    </div>
  );
};

export default LogIn;
