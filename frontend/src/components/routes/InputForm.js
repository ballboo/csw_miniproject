import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const InputForm = props => {
    const { data, onChange } = props;

    const dispatch = useDispatch({})
    const students = useSelector(state => state.students)
    const form = useSelector(state => state.form)

    const addStudent = async () => {
        const result = await axios.post(`https://api-miniproject.herokuapp.com/api/getStudents/`, form)
        dispatch({ 
            type: "ADD_STUDENT", 
            students: {...form,id:students.length > 0 ? students[students.length - 1].id+1 : 0} 
        })
    }

    return (
        <div className='container'>
            <div className="card-body">
            <h2>Add students</h2>
            <table>
                <tbody>
                    <tr>
                        <td>PSU Passport</td>
                        <td>
                            <input className='form-control' type="number" onChange={(e) => dispatch({ type: "CHANGE_PSUID", psuid: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input className='form-control' type="text" onChange={(e) => dispatch({ type: "CHANGE_NAME", name: e.target.value })} />
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Email</td>
                        <td>
                            <input className='form-control' type="text" onChange={(e) => dispatch({ type: "CHANGE_EMAIL", email: e.target.value })} /> 
                        </td>
                    </tr>
                    <tr>
                        <td>Tel</td>
                        <td>
                            <input className='form-control' type="text" onChange={(e) => dispatch({ type: "CHANGE_TEL", tel: e.target.value })} /> <br />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className='btn btn-primary' onClick={addStudent}>CREATE</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default InputForm ;