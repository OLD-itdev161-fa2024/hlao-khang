import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";

const App = () => {
  const [data, setData] = useState();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        try {
          setData(res.data);
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      })
      .catch((err) => console.log(`Error fetching data ${err}`));

    authenticateUser();
  });

  const authenticateUser = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.removeItem("user");
      setUser(null);
    }

    if (token) {
      const config = { headers: { "x-auth-token": token } };
      axios
        .get("http://localhost:5000/api/auth", config)
        .then((response) => {
          localStorage.setItem("user", response.data.name);
          setUser(response.data.name);
        })
        .catch((error) => {
          localStorage.removeItem("user");
          setUser(null);
          console.log(`Error logging in: ${error}`);
        });
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Good Things</h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            {user ? (
              <Link to='' onClick={logOut}>
                Log out
              </Link>
            ) : (
              <Link to='/login'>Log in</Link>
            )}
          </li>
        </ul>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home data={data} />} />
          <Route
            path='/register'
            element={<Register authenticateUser={authenticateUser} />}
          />
          <Route
            path='/login'
            element={<Login authenticateUser={authenticateUser} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
