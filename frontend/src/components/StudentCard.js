import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
const StudentCard = props => {

    const dispatch = useDispatch()
    const form = useSelector(state => state.form)
    const deleteStudent = async () => {
        const result = await axios.delete(`http://localhost:8080/api/getStudents/${props.id}`)
        dispatch({type : 'DELETE_STUDENT', id: props.id})
      }
    
    const updateStudent = async () => {
    const result = await axios.post(`http://localhost:8080/api/getStudents/${props.id}`, form)
    dispatch({type : 'UPDATE_STUDENT', id: props.id , student: {...form, id: props.id}})
  }
    return (
        <div className='container'>
         
                <p className='bearcard-psuid'>{props.psuid}</p>
                <p className='bearcard-name'>{props.name}</p>
                <p className='bearcard-name'>{props.email}</p>
                <p className='bearcard-name'>{props.tel}</p>

            <div className='bearcard-actions'>
                <button onClick={updateStudent}>Update</button>
                <button onClick={deleteStudent}>Delete</button>
            </div>
        </div>

    )
}

export default StudentCard;