import React,{useState, useEffect} from 'react';
import '../../css/App.css';
import axios from 'axios'




function Profile() {
  const [psuid, setPsuid] = useState('');
  const [name, setName] = useState(''); 
  const [data, setData] = useState([]);
  const [pid, setPid] = useState("") ;
  const [token, setToken] = React.useState(localStorage.getItem('Token'));
  const [redirect, setRedirect] = useState(false);

 
  const checkToken = async () => {
    let result = await axios.post('https://api-miniproject.herokuapp.com/api/login/token','',{
      headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + token
    }})
    console.log(result)
    if (result.data.code === 401){
      setRedirect(true)
      
    }
    else{
      setPid(result.data.data.pid)
      setPsuid(result.data.data.psupassport)
      setName(result.data.data.name)
    }
 
  }
 

  const printData = () => {
    return(
      <div>
         {psuid} : {name} : {pid}
      </div>
    )
  }
  useEffect(() => { 
     checkToken()
     
  },)


  return (
    <div className="App"> 
    {printData()}
        <br/><br/>  

    </div>
  );
}

export default Profile;
