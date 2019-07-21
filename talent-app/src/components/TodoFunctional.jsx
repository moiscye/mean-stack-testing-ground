import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";

export const TodoFunctional = () => {
  const [todos, setTodos] = useState();
  const [newTodoLabel, setNewTodoLabel] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const result = await fetch("http://localhost:8000/api/todo/");
    const todoList = await result.json();
    setTodos(todoList);
  }

  const markAsDone = (id, done) => {
    setTodos(todos.map(todo => (todo._id === id ? { ...todo, done } : todo)));
  };

  const save = async e => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/todo/", {
      method: "POST",

      body: JSON.stringify({ name: newTodoLabel, done: false }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    fetchData();
    setNewTodoLabel("");
  };

  const onDelete = async id => {
    await fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    fetchData();
  };
  const todosList = () => {
    return todos ? (
      todos.map(item => (
        <li key={item._id}>
          {" "}
          <input
            type="checkbox"
            label={item.name}
            checked={item.done}
            onChange={({ target }) => markAsDone(item._id, target.checked)}
          />{" "}
          <span className={item.done ? "done" : ""}>
            {item.name}
            <Icon className="trash" onClick={() => onDelete(item._id)} />
          </span>
        </li>
      ))
    ) : (
      <div>loading...</div>
    );
  };

  return todos ? (
    <div className="todo-list" style={{ margin: "5em", textAlign: "left" }}>
      <h3>Todo List</h3>
      <ul>{todosList()}</ul>
      <form onSubmit={save}>
        <input
          placeholder="Add todo"
          type="text"
          value={newTodoLabel}
          onChange={({ target }) => setNewTodoLabel(target.value)}
        />
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
