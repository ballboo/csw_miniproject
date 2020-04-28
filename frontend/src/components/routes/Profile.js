import React, { useState, useEffect } from "react";
import "../../css/App.css";
import axios from "axios";
import Profile_img from '../../img/profile.png'

function Profile() {
  const [psuid, setPsuid] = useState("");
  const [name, setName] = useState("");
  const [pid, setPid] = useState("");
  const [token, setToken] = React.useState(localStorage.getItem("Token"));

  const checkToken = async () => {
    let result = await axios.post(
      "https://api-miniproject.herokuapp.com/api/login/token",
      "",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(result);
    if (result.data.code === 401) {
    } 
    else {
      setPid(result.data.data.pid);
      setPsuid(result.data.data.psupassport);
      setName(result.data.data.name);
    }
  };

  useEffect(() => {
    checkToken();
  });

  return (
    <div className="container" style={{maxWidth: "500px"}} >
      <div className="card " >
        <h5 className="card-header">Profile</h5>
        <div className="card-body">
          <div className="media">
            <img src={Profile_img} className="align-self-center mr-3" alt="img_profiie" height="120" />
            <div>
              <p >Name : {name}</p>
              <p >PSU Passport : {psuid}</p>
              <p >Passport : {pid}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
