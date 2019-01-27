const Todo = require("../models/todos");

const getTodos = async () => {
  let todos = await Todo.find({});
  if (!todos) todos = [];
  return todos;
};

const addTodo = async payload => {
  const todo = new Todo(payload);
  return await todo.save();
};

const editTodo = async payload => {
  const { _id, text } = payload;
  await Todo.update({ _id }, { text });
};

const deleteTodo = async _id => {
  await Todo.remove({ _id });
  return await Todo.find({});
};

const deleteAllTodos = async (req, res) => {
  await Todo.deleteMany({});
  return;
};

module.exports = {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
  deleteAllTodos
};
