import { createStore, combineReducers } from 'redux'
// import { act } from 'react-dom/test-utils';

const initialForm = {
    name: "",
    psuid: 0,
    email: "",
    tel:"",
}
const formReducer = (data = initialForm, action) => {
    switch (action.type) {
        case "CHANGE_NAME": return { ...data, name: action.name }
        case "CHANGE_PSUID": return { ...data, psuid: action.psuid }
        case "CHANGE_EMAIL": return { ...data, email: action.email }
        case "CHANGE_TEL": return { ...data, tel: action.tel }
    }
    return data; //less than return itSelf

}

const studentReducer = (students = [], action) => {
    switch (action.type) {
        case "GET_STUDENTS": return action.students
        case "ADD_STUDENT": return [...students, action.students];
        case "DELETE_STUDENT" : return students.filter( student => +student.id !== +action.id )
        case "UPDATE_STUDENT" : return students.map(student => {
            if (+student.id === +action.id ){
                return action.student
            }
            else
                return student 
        })
    }
    return students; //less than return itSelf
}

const rootReducer = combineReducers({
    students:studentReducer,
    form:formReducer,
})
export const store = createStore(rootReducer);