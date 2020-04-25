import React from 'react';
// eslint-disable-next-line
import { BrowserRouter as  Route,Link } from "react-router-dom"

import '../../css/App.css';
import ENG from '../../img/Logo-PSU-EN.png';
import PSU from '../../img/Logo-PSU-EH-01.png'



function Home() {
  return (
    <div className="App">
      
        <br/><h3>Welcome To miniProject</h3>

 		<img src={PSU} className="PSU-logo" alt="PSU" width='30%'/><br/>
        <img src={ENG} className="ENG-logo" alt="ENG" width='30%'/><br/>
        
        
  
 		
 		<div>
 		<Link to="/login"> 
 		<br/><br/><br/>
 		<button type="button" className="btn btn-outline-primary btn-lg">SignIn</button>
 		<br/><br/><br/>
 		</Link>  
 		</div>
      
    </div>
  );
}

export default Home;
