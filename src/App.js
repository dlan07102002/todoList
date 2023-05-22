import styles from "./App.module.css";
import Heading from "./components/Heading";
import { useState } from "react";
import { useStore, actions } from "./store";
import { useRef } from "react";


function App() {
  const [state, dispatch] = useStore();
  let { todos, todoInput } = state;
  const ref = useRef();
  const [updateId, setUpdateId] = useState(null);
  const [updateDesc, setUpdateDesc] = useState("");

  const handleAdd = () => {
    if (todoInput.trim() !== "") {
      dispatch(actions.addJob(todoInput));
      dispatch(actions.setJob(""));
      ref.current.focus();
    }
  };

  const handleRemove = (index) => {
    dispatch(actions.removeJob(index));
  };

  const handleUpdate = (desc, index) => {
    setUpdateId(index);
    setUpdateDesc(desc);
  };

  const handleInputChange = (event) => {
    setUpdateDesc(event.target.value);
  };

  const handleSave = (e, id) => {
    e.preventDefault();
    const updateTodos = todos.map((todo, index) => {
      if (index === updateId) {
        todo.info = updateDesc;
      }
      return todo.info;
    });
    dispatch(actions.updateJob(updateDesc, id));
    setUpdateId(null);
    setUpdateDesc("");
  };

  const handleCancel = (e) => {
    setUpdateId(null);
  };

  const handleToggleComplete = (id) => {
    todos[id].checked = !todos[id].checked;
    dispatch(actions.completeJob(todos[id].checked, id));
  };

  return (
    <div className={styles.container}>
      <Heading />
      <div className={styles.appContainer}>

        <input
          ref={ref}
          value={todoInput}
          className={styles.todoInput}
          placeholder="Enter Something..."
          onChange={(e) => {
            dispatch(actions.setJob(e.target.value))
          }}
        />
        <button onClick={handleAdd}>ADD</button>
        <ul style={{ paddingLeft: "0px" }} className={styles.list}>
          {
            todos.map((todo, index) => (
              <li key={index} className={styles.todoItem}>
                {updateId === index ? (
                  <form onSubmit={(e) => handleSave(e, updateId)}>
                    <input
                      className={styles.todoInput}
                      type="text"
                      value={updateDesc}
                      onChange={handleInputChange}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div className={styles.todoOptionContainer}>
                    <div className={styles.todoItemInfo}>
                      <input
                        type="checkbox"
                        checked={todo.checked}
                        onChange={() => handleToggleComplete(index)}
                      />
                      <span
                        style={{
                          textDecoration: todo.checked
                            ? "line-through"
                            : "none",
                        }}
                        onDoubleClick={() => handleUpdate(todo.info, index)}
                      >
                        {todo.info}
                      </span>
                    </div>
                    <div className={styles.todoOptionsList}>
                      <div>
                        <button>Menu</button>
                      </div>
                      <div className={styles.todoOptionItem}>
                        <button
                          style={{ padding: "0 20px" }}
                          onClick={() => handleRemove(index)}
                        >
                          DELETE
                        </button>
                        <button onClick={() => handleUpdate(todo.info, index)}>
                          UPDATE
                        </button>
                        <button>Note</button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App;
