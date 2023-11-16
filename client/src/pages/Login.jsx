import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ authenticateUser }) {
  const navigate = useNavigate();
  let [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  let [errors, setErrors] = useState([]);
  const { email, password } = userData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const loginUser = async () => {
    const newUser = { email: email, password: password };
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios.post(
        "http://localhost:5000/api/login",
        JSON.stringify(newUser),
        config
      );

      // store user data and redirect
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      localStorage.removeItem("token");
      setErrors(error.response.data.errors);
    }
    authenticateUser();
  };

  return (
    <>
      <h2>Log in</h2>
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
      <button onClick={() => loginUser()}>Log in</button>
      {errors.map((error, index) => {
        return <p key={index}>{error.msg}</p>;
      })}
    </>
  );
}
