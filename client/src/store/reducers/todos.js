import * as actionTypes from "../actions/actionTypes";

const initialState = {
  input: "",
  editing: false,
  todos: []
};

const getIndexFromId = (id, todos) => todos.findIndex(todo => todo._id === id);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TODOS:
      return {
        ...state,
        todos: action.todos
      };
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
        editing: false,
        input: ""
      };
    case actionTypes.CHANGE_INPUT:
      return {
        ...state,
        input: action.input
      };
    case actionTypes.EDIT_TODO:
      const editIndex = getIndexFromId(action.id, state.todos);
      return {
        ...state,
        input: state.todos[editIndex].text,
        editing: true
      };
    case actionTypes.UPDATE_TODO:
      const todos = [...state.todos];
      const updateIndex = getIndexFromId(action.id, state.todos);
      todos[updateIndex].text = state.input;
      return {
        ...state,
        todos,
        input: "",
        editing: false
      };
    case actionTypes.CLEAR_INPUT:
      return {
        ...state,
        input: "",
        editing: false
      };
    default:
      return state;
  }
};

export default reducer;
