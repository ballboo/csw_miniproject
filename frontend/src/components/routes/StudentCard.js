import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
const StudentCard = props => {

    const dispatch = useDispatch()
    const form = useSelector(state => state.form)
    
    const deleteStudent = async () => {
        const result = await axios.delete(` https://api-miniproject.herokuapp.com/api/getStudents/${props.id}`)
        dispatch({type : 'DELETE_STUDENT', id: props.id})
      }
    
    const updateStudent = async () => {
    const result = await axios.post(` https://api-miniproject.herokuapp.com/api/getStudents/${props.id}`, form)
    dispatch({type : 'UPDATE_STUDENT', id: props.id , student: {...form, id: props.id}})
  }
    return (
        <div className='container'>
            <div class="card bg-light mb-3" >
            <div class="card-header">Student ID: {props.psuid}</div>
            <div class="card-body">
                <p className='bearcard-name'>Name: {props.name}</p>
                <p className='bearcard-name'>Email: {props.email}</p>
                <p className='bearcard-name'>Tel: {props.tel}</p>

            <div>
                <button className="btn btn-success btn-lg btn-block" onClick={updateStudent}>Update</button>
                <button className="btn btn-danger btn-lg btn-block" onClick={deleteStudent}>Delete</button>
            </div>
                
                </div>
            </div>
        </div>

    )
}

export default StudentCard;