import React, { useState } from "react";
import axios from "axios";
import "../../css/App.css";
import psuImg from "../../img/Logo-PSU-EH-01.png";
import person from '../../img/person.svg'
import key from '../../img/key.svg'
import {Redirect} from 'react-router-dom'
function Login() {
  // state = {redirect: false }
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); 

  const loginPSU = e => {
		e.preventDefault()
		axios
			.post('https://api-miniproject.herokuapp.com/api/login', {username,password})
			.then(response => {
        console.log(token)
        setToken(response.data.token)
        //console.log(response.data.code)
      if(response.data.code === 200){
        //console.log("login succuss")
        alert('Login Succuss')
        setRedirect(true)
        
       
        // this.setstate({ redirect : true })

      }
      else if(response.data.code === 401 ){ 
        //console.log("Username or password is incorrect")
        alert('Username or password is incorrect')
      }
      else{
        //console.log("login false")
        alert('Username and Password is required')
      }
			})
			.catch(error => {
				console.log(error)
			})
  }
  const checkRedirect = (status) =>{

    // console.log("200"); 
    // console.log(status)
    if(status){
      return (
      <Redirect from='/login' to={{pathname: '/login/profile',  state: { token: token }}}></Redirect>
        
      )
    }
    else{
      return status
    }
  }

  return (
    <div className="App ">
      {checkRedirect(redirect)}
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
        <div className="card">
        <div className="card-body">
          <img className="mb-4" src={psuImg} alt="psu" width="30%" />
          <h3 className="card-title">PSU Passport</h3>
          <form className="form-signin">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1" >
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
                <img src={key} alt=""  />
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
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={loginPSU}>
              Sign in
            </button>
   
          </form>
        </div>
      </div>
        </div>
        <div className="col-1"></div>
       </div>
      
      <section className="section container">
        <div className="columns is-centered">
          <div className="column is-half"></div>
        </div>
      </section>
    </div>
  );
}

export default Login;
