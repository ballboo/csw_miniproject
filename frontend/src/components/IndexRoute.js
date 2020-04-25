import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Home from './routes/Home'
import Login from './routes/Login'
import StudentList from './routes/StudentList'
import Profile from './routes/Profile'
import SendEmail from './routes/SendEmail'


const IndexRoute = () => {


    return (
        <div>
            <Router>
                <div>
                    <nav>
                        <h4>
                            <Link to="/home" > Home</Link> | 
                            <Link to="/login"> Login</Link> | 
                            <Link to="/students"> Students</Link>  |
                            <Link to="/sendEmail" >SendEmail</Link>
                        </h4> 
                    </nav>
                        <Route path="/home" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/login/profile/students" exact component={StudentList} />
                        <Route path="/students" exact component={StudentList} />
                        <Route path="/login/profile" exact component={Profile} />
                        <Route path="/sendEmail" exact component={SendEmail} />
                </div>
            </Router>
        </div>
    )

}
export default IndexRoute ;