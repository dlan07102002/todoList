import {useReducer, useRef} from 'react';
import reducer, {initState} from './reducer.js';
import {addJob, setJob, deleteJob} from './actions.js'
//2.Actions
//4. Dispatch
function Content(){
    const [state, dispatch] = useReducer(reducer, initState);

    const {job, jobs} = state;
    const inputRef = useRef()
    const handleSubmit = () => {
        dispatch(addJob(job))
        dispatch(setJob(''))

        inputRef.current.focus()
    }
    return (
        <div style = {{padding: '0 20px'}}>
            <h2>TODOS LISTS</h2>
            <input 
    
                ref = {inputRef}
                value = {job}
                onChange={e => { dispatch(setJob(e.target.value))}}
                placeholder='Enter something...'/>
            <button
                onClick = {handleSubmit}
            >ADD</button>
            <ul>
                {
                    jobs.map((job, index)=> {
                        return (
                            <li key={index}>{job} 
                                <span onClick = {() =>dispatch(deleteJob(index))}>&times;</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Content;