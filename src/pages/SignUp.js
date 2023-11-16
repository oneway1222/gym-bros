import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    const targetId = e.target.id;
    switch (targetId) {
      case "firstname":
        setFirstname(e.target.value);
        break;
      case "lastname":
        setLastname(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        validateEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth", {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      })
      .then(function (response) {
        console.log("resp from sign in endpoint", response);
        /*response = {
          status: "success",
          data: {
            id: 5,
            provider: "email",
            uid: "test@gmail.com",
            allow_password_change: false,
            first_name: "hangill",
            last_name: "chong",
            email: "test@gmail.com",
            created_at: "2023-10-29T22:32:15.124Z",
            updated_at: "2023-10-29T22:32:15.230Z",
            goal: null,
            gender: null,
            age: null,
            height_in_feet: null,
            height_in_inches: null,
            weight: null,
          },
        };*/
        if (response.data.status === "success") {
          const newUserData = response.data.data;
          navigate("/login", { state: { email: newUserData.email } });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        id="firstname"
        type="text"
        value={firstname}
        placeholder="Enter your First Name"
        required
        onChange={onChange}
      />
      <br />
      <input
        id="lastname"
        type="text"
        value={lastname}
        placeholder="Enter your Last Name"
        required
        onChange={onChange}
      />
      <br />
      <input
        id="email"
        type="text"
        value={email}
        placeholder="Enter your email"
        onChange={onChange}
        onBlur={() => validateEmail(email)}
      />
      <p>{emailErrorMessage}</p>
      <input
        id="password"
        type="password"
        value={password}
        placeholder="Enter your password"
        pattern="(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}" //Password contains at least one symbol, number, upper case letter and lower case letter with minimum 8 lengths
        required
        onChange={onChange}
      />
      <br />
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        placeholder="Confirm your password"
        required
        onChange={onChange}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignUp;
