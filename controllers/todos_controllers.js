const todosRepos = require("../repositories/todos_repos");

const getTodos = async (req, res) => {
  let todos = await todosRepos.getTodos();
  res.send(todos);
};

const addTodo = async (req, res) => {
  const savedTodo = await todosRepos.addTodo(req.body);
  res.send(savedTodo);
};

const editTodo = async (req, res) => {
  const _id = req.params.id;
  const text = req.body.text;
  await todosRepos.editTodo({ _id, text });
  res.send({ _id, text });
};

const deleteTodo = async (req, res) => {
  const todos = await todosRepos.deleteTodo(req.params.id);
  res.send(todos);
};

const deleteAllTodos = async (req, res) => {
  await todosRepos.deleteAllTodos();
  res.send();
};

module.exports = {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
  deleteAllTodos
};
