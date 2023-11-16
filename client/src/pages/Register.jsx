import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register({ authenticateUser }) {
  const navigate = useNavigate();
  let [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  let [errors, setErrors] = useState([]);

  const { name, email, password, passwordConfirm } = userData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const registerUser = async () => {
    if (!name || !email || !password || !passwordConfirm)
      return console.log("Make sure all fields have a value");

    if (password !== passwordConfirm) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        name: name,
        email: email,
        password: password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post(
          "http://localhost:5000/api/users",
          JSON.stringify(newUser),
          config
        );

        localStorage.setItem("token", res.data.token);
        navigate("/");
      } catch (error) {
        localStorage.removeItem("token");
        setErrors(error.response.data.errors);
      }

      authenticateUser();
    }
  };

  return (
    <>
      <h1>Register</h1>
      <div>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Email'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Confirm Password'
          name='passwordConfirm'
          value={passwordConfirm}
          onChange={(e) => onChange(e)}
        />
      </div>
      <button onClick={() => registerUser()}>Register</button>
      <div id='errors'>
        {errors.map((error, index) => {
          return <p key={index}>{error.msg}</p>;
        })}
      </div>
    </>
  );
}
