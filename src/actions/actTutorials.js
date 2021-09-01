import axios from "axios";
import { API_BASE } from "./../config/env";
import {
  FETCH_TUTORIALS,
  INSERT_TUTORIAL,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  SET_SHOW_ADD_EDIT,
} from "./typesTutorials";

export const fetchTutorials = () => {
  return {
    type: FETCH_TUTORIALS,
    payload: axios.get(`${API_BASE}/tutorials`).then((result) => {
      return result.data.Kayitlar;
    }),
  };
};

export const updateTutorial = (data) => {
  return {
    type: UPDATE_TUTORIAL,
    payload: axios
      .put(`${API_BASE}/tutorials/${data.id}`, data)
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

export const saveTutorial = (data) => {
  return {
    type: INSERT_TUTORIAL,
    payload: axios.post(`${API_BASE}/tutorials`, data).then((result) => {
      return result.data.Kayitlar;
    }),
  };
};

export const deleteTutorial = (id) => {
  return {
    type: DELETE_TUTORIAL,
    payload: axios.delete(`${API_BASE}/tutorials/${id}`).then(() => {
      return id;
    }),
  };
};

export const findTutorialsByTitle = (title) => {
  return {
    type: FETCH_TUTORIALS,
    payload: axios
      .get(`${API_BASE}/tutorials/title/${title}`)
      .then((result) => {
        return result.data.Kayitlar;
      }),
  };
};
