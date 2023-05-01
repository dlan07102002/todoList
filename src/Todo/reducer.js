import { SET_JOB, ADD_JOB, DELETE_JOB } from "./constants";
const JSONdata = localStorage.getItem('state')
const dataRender = JSON.parse(JSONdata)
export const initState = {
    job: '',
    jobs: dataRender
};

//3.Reducer
const reducer = (state, action) => {
   
    let newState
    switch(action.type){
        case SET_JOB:
            newState = {
                ...state,
                job: action.payload
            }
            break
        case ADD_JOB:
            newState = {
                ...state,
                jobs: [...state.jobs, action.payload]
            }
            localStorage.setItem('state', JSON.stringify(newState.jobs))
            break
        case DELETE_JOB:
            const newJobs = [...state.jobs]
            newJobs.splice(action.payload, 1)
            newState = {
                ...state, 
                jobs: newJobs
            }
            localStorage.setItem('state', JSON.stringify(newState.jobs))
            break;
        default:
            throw new Error(`Invalid action ${action.type}`)
    }
    console.log('New state: ', newState)

    return newState
}

export default reducer