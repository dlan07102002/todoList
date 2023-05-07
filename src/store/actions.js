import {SET_JOB, ADD_JOB, REMOVE_JOB, UPDATE_JOB} from './constants'
export const setJob = payload => {
    return {
        type: SET_JOB,
        payload
    }
}

export const addJob = payload => {
    return {
        type: ADD_JOB,
        payload
    }
}
export const removeJob = payload => {
    return{
        type: REMOVE_JOB,
        payload
    }
}

export const updateJob = (payload,index) => {
    return {
        type: UPDATE_JOB,
        payload,
        id: index
    }
}
