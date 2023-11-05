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
    password === confirmPassword
      ? axios
          .post("http://localhost:3000/auth", {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
          })
          .then(function (response) {
            console.log("resp from sign in endpoint", response);
            response = {
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
            };
            if (response.status === "success") {
              const newUserData = response.data;
              // navigate to /login
            }
          })
          .catch((error) => {
            console.error(error);
          })
      : alert("Check your password");
    e.preventDefault();
    console.log(firstname, lastname, email, password, confirmPassword);
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
        onChange={onChange}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignUp;
