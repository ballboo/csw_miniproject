import React, {useState, useEffect } from 'react'
import axios from 'axios'
import '../../css/SendEmail.css'
import '../../css/App.css'



const SendEmail = (props) => {
    const [subject, setSubject] = useState(''); 
    const [email, setEmail] = useState('');
    const [detail, setDetail] = useState('');
    const [getAllEmail, setGetAllEmail] = useState([]);

    
  const getSendAllEmail = async () => {
    const result = await axios.get(` https://api-miniproject.herokuapp.com/api/getStudents`)
    const  AllEmail = result.data.students ;
    setGetAllEmail(AllEmail)
    
  }
  const SendToAllEmail = () =>{
    getAllEmail.map(async(AllEmail) =>{
        await axios.post(`https://api-miniproject.herokuapp.com/api/SendEmail`, {subject, email:AllEmail.email , detail})
        .then(res => {
            console.log(res)
        })
        })
    alert("send sucsses")

  }
  
    const SendToEmail = async (e) => {
        e.preventDefault()
        await axios.post(`https://api-miniproject.herokuapp.com/api/SendEmail`, {subject, email , detail})
        .then(res => {
            console.log(res)
        })
        alert("send sucsses")
    }
    

    useEffect(()=>{
        getSendAllEmail()
     },)


    return (
        <div className="App">
            <div className="container">
                <div className="mb-10 pt-10">
                    <h1>SendEmail</h1>
                    <div class="form-group row">
                        <label className="col-sm-2 col-form-label ">Send to:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control"  placeholder="Email"  onChange={(e) => setEmail(e.target.value) } /> 
                        
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label ">Subject:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control"  placeholder="Subject"  onChange={(e) => setSubject(e.target.value) } />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label ">Send to:</label>
                        <div class="col-sm-7">
                            <textarea type="text" className="form-control"  rows="3" aria-label="With textarea" onChange={(e) => setDetail(e.target.value) } />
                        </div>
                    </div>
                    <div className="form-group row">
                            <div className="col-sm-5" style={{maxWidth: "20%"}}>
                                <button type="button" className="btn btn-outline-primary" onClick={SendToEmail}>SendEmail</button>
                            </div>
                            <button type="button" className="btn btn-outline-primary" onClick={SendToAllEmail}>SendEmail To All Students</button>
                    </div>
                    </div>
            </div>
        </div>
    )
}
export default SendEmail; 