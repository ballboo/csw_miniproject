import React, {useState, useEffect } from 'react'
import axios from 'axios'



const SendEmail = (props) => {
    const [subject, setSubject] = useState(''); 
    const [email, setEmail] = useState('');
    const [detail, setDetail] = useState('');
    const [token, setToken] = React.useState(localStorage.getItem('Token'));
    const [redirect, setRedirect] = useState(false);



      
  const checkToken = async() => {
    let result = await axios.post('https://api-miniproject.herokuapp.com/api/login/token','',{
      headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + token
    }})
    console.log(result)
    if (result.data.code === 401){
        setRedirect(true)
    }
  }

    const SendToEmail = async(e) => {
        console.log(subject)
        e.preventDefault()
        await axios.post(`https://api-miniproject.herokuapp.com/api/SendEmail`, {subject, email , detail})
        .then(res => {
            console.log(res)
        })
        alert("send sucsses")
    }

    useEffect(()=>{
        checkToken()
     },)


    return (
        <div>
          <div className="row">
           
              <div className="container">
              <table>
              <tbody>
                  <tr>
                      <td>Send to:</td>
                      <td> <input className="form-control"  type="text"  placeholder="Send to " onChange={(e) => setEmail(e.target.value) } /> <br/></td>
                  </tr>
                  <tr>
                      <td>Subject:</td>
                      <td><input  className="form-control" type="text"   placeholder="Subject" onChange={(e) => setSubject(e.target.value) } /> <br/></td>
                  </tr>
                  <tr>
                      <td> Message:</td>
                      <td>  
                          <textarea className="form-control" rows="3" aria-label="With textarea" onChange={(e) => setDetail(e.target.value) }></textarea>
                        </td>
                  </tr>
                  <tr>
                      <td><button type="button"  className='btn btn-outline-primary' onClick={SendToEmail}> Send Email </button></td>
                  </tr>
              </tbody>
          </table>
              </div>
             
          </div>
           
        </div>
    )
}
export default SendEmail; 