import { useState } from "react";
import "./index.css";

function generateId() {
  return Math.floor(Math.random() * 1000);
}

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (editId !== null) {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos((todos) =>
        todos.concat({
          text: input,
          id: generateId(),
        })
      );
    }
    setInput("");
  };

  const removeTodo = (id) => {
    setTodos((todos) => todos.filter((t) => t.id !== id));
  };

  const startEditing = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New Todo"
      />

      <button onClick={handleSubmit}>
        {editId !== null ? "Update" : "Submit"}
      </button>

      <ul className="todos-list">
        {todos.map(({ text, id }) => (
          <li key={id} className="todo">
            <span onClick={() => startEditing({ text, id })}>{text}</span>
            <button className="close" onClick={() => removeTodo(id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
