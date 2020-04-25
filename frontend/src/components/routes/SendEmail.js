import React, {useState } from 'react'



const SendEmail = () => {
    const [subject, setSubject] = useState(''); 
    const [sendEmailTo, setSendEmailTo] = useState('');
    const [message, setMessage] = useState('');


    const SendToEmail = () => {

    }



    return (
        <div className="container">
            to: <input  className="inpt" type="text"  placeholder="Send to " onChange={(e) => setSendEmailTo(e.target.value) } /> <br/>
            Subject: <input  className="inpt" type="text"   placeholder="Subject" onChange={(e) => setSubject(e.target.value) } /> <br/>
            Message: <input  className="inpt" type="text"  placeholder="Message" onChange={(e) => setMessage(e.target.value) } /> <br/>
            <button type="button"  className='btn btn-outline-primary' > Send Email </button>
        </div>
    )
}
export default SendEmail; 