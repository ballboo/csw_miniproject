import React from 'react';
// eslint-disable-next-line

import '../../css/App.css';
import PSU from '../../img/Logo-PSU-EH-01.png'



function Home() {
  return (
    <div className="App">
      <br/><h1>Alert & Database Students</h1>
      <img src={PSU} className="PSU-logo" alt="PSU" width='30%'/><br/>

      <p className="font-thai">ระบบการจัดการฐานข้อมูลและระบบแจ้งเตือนผ่านอีเมล์ของนักเรียน </p>

    

      
    </div>
  );
}

export default Home;
