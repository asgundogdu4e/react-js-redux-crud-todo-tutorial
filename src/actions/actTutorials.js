import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "./types";

import TutorialDataService from "../services/tutorial.service";

export const saveTutorial = (data) => async (dispatch) => {
  try {
    const res = await TutorialDataService.create(data);

    dispatch({
      type: CREATE_TUTORIAL,
      payload: res.data.Kayitlar,
    });

    return Promise.resolve(res.data.Kayitlar);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTutorials = () => async (dispatch) => {
  try {
    const res = await TutorialDataService.getAll();
    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data.Kayitlar,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTutorial = (data) => async (dispatch) => {
  try {
    const res = await TutorialDataService.update(data);

    dispatch({
      type: UPDATE_TUTORIAL,
      payload: data,
    });

    return Promise.resolve(res.data.Kayitlar);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTutorial = (id) => async (dispatch) => {
  try {
    await TutorialDataService.delete(id);

    dispatch({
      type: DELETE_TUTORIAL,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllTutorials = () => async (dispatch) => {
  try {
    const res = await TutorialDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_TUTORIALS,
      payload: res.data.Kayitlar,
    });

    return Promise.resolve(res.data.Kayitlar);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findTutorialsByTitle = (title) => async (dispatch) => {
  try {
    const res = await TutorialDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data.Kayitlar,
    });
  } catch (err) {
    console.log(err);
  }
};
