import {
  FETCH_TODOS_FULFILLED,
  FETCH_TODOS_PENDING,
  FETCH_TODOS_REJECTED,
  INSERT_TODO_FULFILLED,
  INSERT_TODO_PENDING,
  INSERT_TODO_REJECTED,
  UPDATE_TODO_FULFILLED,
  UPDATE_TODO_PENDING,
  UPDATE_TODO_REJECTED,
  DELETE_TODO_FULFILLED,
  DELETE_TODO_PENDING,
  DELETE_TODO_REJECTED,
  SET_TODO,
  SET_SHOW_ADD_EDIT,
} from "../actions/typesTodos";
import { showToast } from "../assets/js/custom-toastification";

const initialState = {
  todo: null,
  todos: [],
  fetching: false,
  errors: {},
  showAddEdit: false,
};

const rdcTodo = (state = initialState, action) => {
  const { type, payload } = action;
  let todos = [];
  if (
    [
      FETCH_TODOS_REJECTED,
      INSERT_TODO_REJECTED,
      UPDATE_TODO_REJECTED,
      DELETE_TODO_REJECTED,
    ].includes(type)
  ) {
    return {
      ...state,
      fetching: false,
      errors: payload,
    };
  }

  if (
    [
      FETCH_TODOS_PENDING,
      INSERT_TODO_PENDING,
      UPDATE_TODO_PENDING,
      DELETE_TODO_PENDING,
    ].includes(type)
  ) {
    return {
      ...state,
      fetching: true,
    };
  }

  switch (type) {
    //FETCH_TODOS
    case FETCH_TODOS_FULFILLED:
      return {
        ...state,
        fetching: false,
        todos: payload,
      };
    //UPDATE_TODOS
    case INSERT_TODO_FULFILLED:
      showToast("Kayıt işlemi gerçekleştirildi.");
      return {
        ...state,
        fetching: false,
        todos: state.todos.concat(payload),
        showAddEdit: false,
      };
    //UPDATE_TODOS
    case UPDATE_TODO_FULFILLED:
      showToast("Güncelleme işlemi gerçekleştirildi.");
      todos = state.todos.filter((todo) => {
        return todo.id !== payload.id;
      });
      return {
        ...state,
        fetching: false,
        todos: todos.concat(payload),
        showAddEdit: false,
      };

    case DELETE_TODO_FULFILLED:
      showToast("Silme işlemi gerçekleştirildi.");
      todos = state.todos.filter((todo) => {
        return todo.id !== payload;
      });
      return {
        ...state,
        fetching: false,
        todos: todos,
        showAddEdit: false,
      };
    //SET_TUTORUAL
    case SET_TODO:
      return {
        ...state,
        todo: payload,
      };

    //SET_SHOW_ADD_EDIT
    case SET_SHOW_ADD_EDIT:
      return {
        ...state,
        showAddEdit: payload,
      };
    default:
      return state;
  }
};

export default rdcTodo;
