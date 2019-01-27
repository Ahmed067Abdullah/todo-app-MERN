import React from "react";
import Todo from "./Todo/Todo";
import "./Todos.css";

const todos = props => {
  const todos = props.todos.map((todo, index) => {
    return (
      <Todo
        key={todo._id}
        text={todo.text}
        edit={() => props.editTodo(todo._id)}
        delete={() => props.deleteTodo(todo._id)}
      />
    );
  });
  return <ol className="list-group todos">{todos}</ol>;
};

export default todos;
