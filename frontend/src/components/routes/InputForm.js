import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import '../../css/App.css'

const InputForm = props => {
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
        <div className="App">
            <div className="card-body-center text-center">
            <h2>Add students</h2>
            <div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label ">PSU Passport</label>
                    <div class="col-sm-7">
                        <input type="text" className="form-control"  placeholder="58xxxxx110"  onChange={(e) => dispatch({ type: "CHANGE_PSUID", psuid: e.target.value })} />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label ">Name</label>
                    <div class="col-sm-7">
                        <input type="text" className="form-control"  placeholder="Name Surname"  onChange={(e) => dispatch({ type: "CHANGE_NAME", name: e.target.value })} />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label ">Email</label>
                    <div class="col-sm-7">
                        <input type="text" className="form-control"  placeholder="58xxxxxxxx@psu.ac.th"  onChange={(e) => dispatch({ type: "CHANGE_EMAIL", email: e.target.value })} />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label ">Tel</label>
                    <div class="col-sm-7">
                        <input type="text" className="form-control"  placeholder="089-9999999"  onChange={(e) => dispatch({ type: "CHANGE_TEL", tel: e.target.value })}  />
                    </div>
                </div>
                <div class="form-group row">
                        <div class="col-sm-5">
                                <button type="button" className="btn btn-outline-primary" onClick={addStudent}>CREATE</button>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default InputForm ;