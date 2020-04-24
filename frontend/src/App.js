import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StudentCard from './components/StudentCard'
import StudentList from './components/StudentList'
import InputForm from './components/InputForm';

export default () => {

  return (
    <div>
      <h2>Students</h2>
      <StudentList  />
      <InputForm />
    </div>
  )
}
