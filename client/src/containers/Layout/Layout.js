import React, { Component } from "react";
import { connect } from "react-redux";

import Todos from "../../components/Todos/Todos";
import Input from "../../components/Input/Input";
import * as actions from "../../store/actions/todos";
import "./Layout.css";

class Layout extends Component {
  state = {
    editingId: ""
  };

  componentDidMount() {
    this.props.getTodos();
  }

  changeInputHandler = input => {
    this.props.onChangeInput(input);
  };

  saveTodoHandler = () => {
    const { input } = this.props.todosData;
    const { editingId } = this.state;
    if (input && input.trim() !== "") {
      this.props.onAddTodo(input, editingId);
      this.setState({ editingId: "" });
    }
  };

  deleteTodoHandler = id => {
    const flag = id === this.state.editingId;
    if (flag) this.setState({ editingId: "" });
    this.props.onDeleteTodo(id, flag);
  };

  deleteAllTodosHandler = () => {
    this.props.onDeleteAllTodos();
  };

  editTodoHandler = editingId => {
    this.props.onEditTodo(editingId);
    this.setState({ editingId });
  };

  render() {
    const { todos, editing, input } = this.props.todosData;
    let btnValue = "Add";
    let btnClass = "primary";
    if (editing) {
      btnValue = "Update";
      btnClass = "warning";
    }
    btnClass = "btn btn-" + btnClass;

    let deleteAllButton = null;
    if (todos.length > 1) {
      deleteAllButton = (
        <Input
          type="button"
          onClick={this.deleteAllTodosHandler}
          value="Delete All"
          className="btn btn-danger"
        />
      );
    }

    return (
      <div className="main-div">
        <h1 className="display-4 heading">Todo App</h1>
        <Input
          type="text"
          value={input}
          className="form-control input-field"
          onChange={event => this.changeInputHandler(event.target.value)}
        />
        <Input
          type="button"
          onClick={this.saveTodoHandler}
          value={btnValue}
          className={btnClass}
        />
        {deleteAllButton}
        {todos.length > 0 ? (
          <Todos
            todos={todos}
            editTodo={this.editTodoHandler}
            deleteTodo={this.deleteTodoHandler}
          />
        ) : (
          <p className="no-todo-msg">No Recent Todos</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todosData: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTodos: () => dispatch(actions.getTodos()),
    onAddTodo: (todo, id) => dispatch(actions.addTodo(todo, id)),
    onEditTodo: id => dispatch(actions.editTodo(id)),
    onDeleteTodo: (id, flag) => dispatch(actions.deleteTodo(id, flag)),
    onDeleteAllTodos: () => dispatch(actions.deleteAllTodos()),
    onChangeInput: input => dispatch(actions.changeInput(input))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
