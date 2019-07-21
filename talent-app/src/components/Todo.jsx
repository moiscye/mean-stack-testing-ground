import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: []
    };
    this.loadData = this.loadData.bind(this);
    this.save = this.save.bind(this);
    this.inputRef = React.createRef();
    this.markAsDone = this.markAsDone.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    const result = await fetch("http://localhost:8000/api/todo/");
    const todoList = await result.json();
    this.setState({ todoList });
  }

  async save(e) {
    e.preventDefault();
    //console.log(this.inputRef.current.value);

    await fetch("http://localhost:8000/api/todo/", {
      method: "POST",

      body: JSON.stringify({ name: this.inputRef.current.value, done: false }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    this.loadData();
    this.inputRef.current.value = null;
  }

  markAsDone(id, done) {
    this.setState({
      todoList: this.state.todoList.map(todo =>
        todo._id === id ? { ...todo, done } : todo
      )
    });
  }
  async delete(id) {
    await fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    this.loadData();
  }

  render() {
    const myList = this.state.todoList.map((item, index) => (
      <li key={item._id}>
        {" "}
        <input
          type="checkbox"
          label={item.name}
          checked={item.done}
          onChange={({ target }) => this.markAsDone(item._id, target.checked)}
        />{" "}
        <span className={item.done ? "done" : ""}>
          {item.name}
          <Icon className="trash" onClick={() => this.delete(item._id)} />
        </span>
      </li>
    ));

    return (
      <div className="todo-list" style={{ margin: "5em", textAlign: "left" }}>
        <h3>Todo List</h3>
        <ul>{myList}</ul>
        <form onSubmit={this.save}>
          <input placeholder="Add todo" type="text" ref={this.inputRef} />
        </form>
      </div>
    );
  }
}
