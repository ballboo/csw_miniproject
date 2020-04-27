import React, { useState } from "react";
import axios from "axios";
import "../css/Login.css";
import psuImg from "../img/Logo-PSU-EH-01.png";
import person from "../img/person.svg";
import key from "../img/key.svg";
import Navbar from "./Navbar";

function Login(props) {
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const loginPSU = (e) => {
    e.preventDefault();
    axios
      .post("https://api-miniproject.herokuapp.com/api/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(token);
        setToken(response.data.token);
        if (response.data.code === 200) {
          alert("Login Succuss");
          setRedirect(true);
        } else if (response.data.code === 401) {
          alert("Username or password is incorrect");
        } else {
          alert("Username and Password is required");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = (order) => {
    console.log(order);
    setToken(order);
  };
  React.useEffect(() => {
    localStorage.setItem("Token", token);
  }, [token]);

  if (token) {
    return (
      <div className="navbar-nav mr-auto">
        <div className="black-color"></div>
        <div className="center">
          <Navbar setlogout={logout} />
        </div>
      </div>
    );
  }
  return (
    <div className="container text-center">
      <form className="form-signin">
        <img className="mb-4" src={psuImg} alt="psu" height="150" />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <img src={person} alt="" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="PSU Passport"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <img src={key} alt="" />
              </span>
            </div>
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={loginPSU}
          >
            Sign in
          </button>
      </form>
    </div>
  );
}

export default Login;
