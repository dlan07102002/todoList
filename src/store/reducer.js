import { SET_JOB, ADD_JOB, REMOVE_JOB, UPDATE_JOB, COMPLETE_JOB } from './constants'

const JsonTodo = localStorage.getItem('todoData')
const todoData = JSON.parse(JsonTodo)
console.log(todoData)
if (todoData.todos === null) {
    todoData.todos = []
} else
    todoData.todos = todoData.todos
const initState = {
    todos: todoData.todos,
    todoInput: ''
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
                todos: [...state.todos, {
                    info: action.payload,
                    checked: false
                }]
            }
            localStorage.setItem('todoData', JSON.stringify(newState))
            return newState
        case COMPLETE_JOB:
            console.log(action.id)
            newState = {
                ...state,
                todos: state.todos.map((todo, index) => {
                    if (index === action.id) {
                        todo.checked = action.payload;
                    }
                    return todo
                })
            }
            localStorage.setItem('todoData', JSON.stringify(newState))
            return newState
        case REMOVE_JOB:
            newState = {
                ...state
                , todos: state.todos.filter((item, index) => {
                    return index !== action.payload
                }
                )
            }
            localStorage.setItem('todoData', JSON.stringify(newState))
            return newState;
        case UPDATE_JOB:
            console.log(action.payload)
            newState = {
                ...state, todos: state.todos.map((item, index) => {
                    if (index === action.id) {
                        item.info = action.payload;
                    }
                    return item
                })
            }

            localStorage.setItem('todoData', JSON.stringify(newState))
            return newState
        default:
            throw new Error(`Invalid action ${action.type}`)
    }
}

export { initState }
export default reducer