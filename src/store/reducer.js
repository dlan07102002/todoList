import {SET_JOB, ADD_JOB, REMOVE_JOB, UPDATE_JOB} from './constants'

const JsonTodo = localStorage.getItem('todoData')
const todoData = JSON.parse(JsonTodo)
console.log(todoData)
const initState = {
    todos: todoData.todos ?? [],
    todoInput: '',
    todoCompleted: false
}

function reducer(state, action) {
    let newState
    switch (action.type) {
        case SET_JOB:
            return {
                ...state,
                todoInput: action.payload
            }
        case ADD_JOB:
             newState = {
                ...state,
                todos: [...state.todos, action.payload]
            }
            localStorage.setItem('todoData', JSON.stringify(newState))
            return newState
        case REMOVE_JOB:
             newState = state.todos.filter((item,index) =>
                {
                    return index !== action.payload
                }
            )
            localStorage.setItem('todoData', JSON.stringify(newState))
            return {
                ...state,
                todos: newState
            }
        case UPDATE_JOB:
            console.log(action.payload)
            newState = {
                ...state, todos: action.payload
            }
            
            localStorage.setItem('todoData', JSON.stringify(newState))
            return newState
        default:
            throw new Error(`Invalid action ${action.type}`)
    }
}

export {initState} 
export default reducer