import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import Home from './routes/Home'
import StudentList from './routes/StudentList'
import Profile from './routes/Profile'
import SendEmail from './routes/SendEmail'



export default function Nav(props) {
  const  goToLogOut = () => {
    const setLogout = null ;
    props.setlogout(setLogout)

  } 
  return (
    <Router >
      <div>
        <nav className="navbar-dark bg-dark">
          <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm " >
            <h5 className="my-0 mr-md-auto font-weight-normal">Alert & Database Student</h5>
            <Link type="button"  to="/Home"><a className="p-2 text-dark">Home</a></Link>&nbsp;
            <Link type="button" to="/Student"><a className="p-2 text-dark">Students</a></Link>&nbsp;
            <Link type="button"  to="/SendEmail"><a className="p-2 text-dark">SendEmail</a></Link>&nbsp;
            <Link type="button"  to="/Profile"><a className="p-2 text-dark">Profile</a></Link>
            <div >
              <button className="btn btn-outline-danger" onClick={goToLogOut}>Logout</button>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/Student">
            <StudentList />
          </Route>
          <Route path="/SendEmail">
            <SendEmail />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

