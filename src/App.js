import './App.css';
import {useState} from 'react'
import { useStore, actions } from './store';
import {useRef} from 'react'

function App() {
  const [state, dispatch] = useStore()
  let {todos, todoInput, todoCompleted} = state;
  // console.log(state)
  const ref = useRef();

  const [updateId, setUpdateId] = useState(null);
  const [updateDesc, setUpdateDesc] = useState('');
  
  const handleAdd = () => {
    if(todoInput.trim() != ''){
      dispatch(actions.addJob(todoInput))
      dispatch(actions.setJob(''))
      ref.current.focus()
    }
  }

  const handleRemove = (index) => {
      dispatch(actions.removeJob(index))
  }

  const handleUpdate = (todo, index) => {
        setUpdateId(index);
        setUpdateDesc(todo);
  }

  const handleInputChange = (event) => {
    setUpdateDesc(event.target.value);
  }

  const handleSave = (e) => {
    e.preventDefault();
    const updateTodos = todos.map((todo, index) => {
      if(index === updateId){
        todo = updateDesc;
      }
      return todo;
    });
    dispatch(actions.updateJob(updateTodos))
    setUpdateId(null);
    setUpdateDesc("");
  }

  const handleCancel = e => {
    setUpdateId(null);
  }

  const handleToggleComplete = () => {
    
  }
  return (
    <div style = {{padding: "32px"}}>
        <input 
          ref = {ref}
          value = {todoInput}
          placeholder = "Enter Something..." 
          onChange={e => { 
              dispatch(actions.setJob(e.target.value))
            }}
        />

      <button onClick={handleAdd}>ADD</button>
      <ul style = {{paddingLeft : '0px'}} >
        { [] && todos.map((todo, index) => 
        (
          <li key={index}>
            {
              updateId === index ? (
                <form
                  onSubmit = {(e) => handleSave(e,updateId)}>
                    <input
                      type = "text"
                      value = {updateDesc}
                      onChange = {handleInputChange}
                    />
                    <button type = "submit" >Save</button>
                    <button type = "button" onClick = {handleCancel}>Cancel</button>
                </form>
              ): (
                <div>
                <input
                  type="checkbox"
                  checked={todoCompleted}
                  onChange={() => handleToggleComplete(todo)}
                />
                <span style={{ textDecoration: todoCompleted ? "line-through" : "none" }}>
                  {todo}
                </span>
                    <button 
                      style = {{padding: '0 20px'}} 
                      onClick={() => handleRemove(index)}
                    >DELETE</button>
                    <button onClick = {() => handleUpdate(todo, index)}>UPDATE</button>
                </div>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
