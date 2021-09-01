import axios from "axios";
import { API_BASE } from "./../config/env";
import {
  FETCH_TODOS,
  INSERT_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  SET_SHOW_ADD_EDIT,
} from "./typesTodos";

export const fetchTodos = () => {
  return {
    type: FETCH_TODOS,
    payload: axios.get(`${API_BASE}/todos`).then((result) => {
      return result.data.Kayitlar;
    }),
  };
};

export const updateTodo = (data) => {
  return {
    type: UPDATE_TODO,
    payload: axios
      .put(`${API_BASE}/todos/${data.id}`, data)
      .then((result) => {
        return result.data.Kayitlar;
      }),
  };
};

export const setShowAddEdit = (data) => async (dispatch) => {
  dispatch({
    type: SET_SHOW_ADD_EDIT,
    payload: data,
  });
};

export const saveTodo = (data) => {
  return {
    type: INSERT_TODO,
    payload: axios.post(`${API_BASE}/todos`, data).then((result) => {
      return result.data.Kayitlar;
    }),
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: axios.delete(`${API_BASE}/todos/${id}`).then(() => {
      return id;
    }),
  };
};

export const findTodosByTask = (task) => {
  return {
    type: FETCH_TODOS,
    payload: axios
      .get(`${API_BASE}/todos/task/${task}`)
      .then((result) => {
        return result.data.Kayitlar;
      }),
  };
};
