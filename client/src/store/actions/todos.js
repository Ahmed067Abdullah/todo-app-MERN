import * as actionTypes from "./actionTypes";
import axios from "axios";

const updateState = (dispatch, todos = [], flag = true) => {
  dispatch({
    type: actionTypes.GET_TODOS,
    todos: todos
  });
  if (flag) dispatch({ type: actionTypes.CLEAR_INPUT });
};

export const getTodos = () => async dispatch => {
  const res = await axios.get("/api/todo");
  let todos = res.data;
  if (!todos) todos = [];
  dispatch({
    type: actionTypes.GET_TODOS,
    todos
  });
};

export const addTodo = (todo, id) => async dispatch => {
  if (id) {
    await axios.put(`api/todo/${id}`, { text: todo });
    dispatch({
      type: actionTypes.UPDATE_TODO,
      id
    });
  } else {
    const res = await axios.post("api/todo", { text: todo });
    let newTodo = res.data;
    dispatch({
      type: actionTypes.ADD_TODO,
      todo: newTodo
    });
  }
};

export const deleteTodo = (id, flag) => async dispatch => {
  const res = await axios.delete(`api/todo/${id}`);
  updateState(dispatch, res.data, flag);
};

export const deleteAllTodos = () => async dispatch => {
  await axios.delete("api/todo/all");
  updateState(dispatch);
};

export const changeInput = input => ({
  type: actionTypes.CHANGE_INPUT,
  input
});

export const editTodo = id => ({
  type: actionTypes.EDIT_TODO,
  id
});
