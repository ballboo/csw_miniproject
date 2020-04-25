import React, { useEffect } from 'react';
import StudentCard from './StudentCard';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import InputForm from './InputForm'
import '../../css/StudentList.css'
const StudentList = props => {
    const students = useSelector(state => state.students);
    const dispatch = useDispatch();

    const getStudents = async () => {
        const result = await axios.get(` https://api-miniproject.herokuapp.com/api/getStudents`)
        console.log(result)
        const action = { type: 'GET_STUDENTS', students: result.data.students }
        dispatch(action)
    }

    useEffect(() => {
        getStudents()
    }, [])

    if (!students || !students.length)
        return (<div><h2>No students</h2> <InputForm /></div>)

    return (
        <>
            <div className='list-container'>
                {
                    students.map((students, index) => (
                        <div key={index} style={{ margin: 5 }}>
                            <StudentCard  {...students} updateStudent={() => props.updateStudent(students.id)} deleteStudent={() => props.deleteStudent(students.id)} />
                        </div>
                    ))
                }
                
            </div>
        <InputForm />
        </>
    )
}

export default StudentList;