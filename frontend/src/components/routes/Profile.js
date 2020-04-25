import React,{useState, useEffect} from 'react';
import '../../css/App.css';
import {Redirect} from 'react-router-dom' ;
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import axios from 'axios'




function Profile(props) {
  const [psuid, setPsuid] = useState('');
  const [name, setName] = useState(''); 
  const [data, setData] = useState([]);
  const [pid, setPid] = useState("") ;

  
  const checkToken = async() => {
    let result = await axios.post('https://api-miniproject.herokuapp.com/api/login/token','',{
      headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + props.location.state.token
    }})

    setPid(result.data.data.pid)
    setPsuid(result.data.data.psupassport)
    setName(result.data.data.name)

  }
  const printData = () => {
    return(
      <div>
         {psuid} : {name} : {pid}
      </div>
    )
  }
  useEffect(()=>{
     checkToken()
  },)
   
  return (
    <div className="App"> 
    {printData()}
        <br/><br/>  
        <Link to="/home"> 
          <button className="btn btn-sm btn-primary " type="submit" >
              Sign Out
            </button>
        </Link>
    </div>
  );
}
export default Profile;
