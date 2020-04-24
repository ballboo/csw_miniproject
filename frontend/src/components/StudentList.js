import React, { useEffect } from 'react';
import StudentCard from './StudentCard';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
const StudentList = props => {
    const students = useSelector(state => state.students);
    const dispatch = useDispatch();

    const getStudents = async () => {
        const result = await axios.get(`http://localhost:8080/api/getStudents`)
        console.log(result)
        const action = { type: 'GET_STUDENTS', students: result.data.students }
        dispatch(action)
    }

    useEffect(() => {
        getStudents()
    }, [])

    if (!students || !students.length)
        return (<h2>No students</h2>)

    return (
        <div className='bearlist-container'>
            {
                students.map((students, index) => (
                    <div key={index} style={{ margin: 5 }}>
                        <StudentCard  {...students} updateStudent={() => props.updateStudent(students.id)} deleteStudent={() => props.deleteStudent(students.id)} />
                    </div>
                ))
            }
        </div>

    )
}

export default StudentList;