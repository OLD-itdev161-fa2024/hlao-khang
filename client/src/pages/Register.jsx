import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = userData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const register = async () => {
    console.log(userData);
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
        const body = JSON.stringify(newUser);
        const res = await axios.post(
          "http://localhost:5000/api/users",
          body,
          config
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
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
      <button onClick={() => register()}>Register</button>
    </>
  );
}
