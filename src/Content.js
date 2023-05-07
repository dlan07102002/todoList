import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, description: "Learn React", completed: false },
    { id: 2, description: "Build a todo list", completed: true },
    { id: 3, description: "Deploy the app", completed: false },
  ]);

  const [updateId, setUpdateId] = useState(null);
  const [updateDescription, setUpdateDescription] = useState("");

  const handleUpdate = (todo) => {
    setUpdateId(todo.id);
    setUpdateDescription(todo.description);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === updateId) {
        return { ...todo, description: updateDescription };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setUpdateId(null);
    setUpdateDescription("");
  };

  const handleCancel = () => {
    setUpdateId(null);
    setUpdateDescription("");
  };

  const handleInputChange = (event) => {
    setUpdateDescription(event.target.value);
  };
  
  const handleToggleComplete = (todo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {updateId === todo.id ? (
              <form onSubmit={handleSave}>
                <input
                  type="text"
                  value={updateDescription}
                  onChange={handleInputChange}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                />
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.description}
                </span>
                <button onClick={() => handleUpdate(todo)}>Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;