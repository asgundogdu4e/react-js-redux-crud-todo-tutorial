import {
  FETCH_TUTORIALS_FULFILLED,
  FETCH_TUTORIALS_PENDING,
  FETCH_TUTORIALS_REJECTED,
  INSERT_TUTORIAL_FULFILLED,
  INSERT_TUTORIAL_PENDING,
  INSERT_TUTORIAL_REJECTED,
  UPDATE_TUTORIAL_FULFILLED,
  UPDATE_TUTORIAL_PENDING,
  UPDATE_TUTORIAL_REJECTED,
  DELETE_TUTORIAL_FULFILLED,
  DELETE_TUTORIAL_PENDING,
  DELETE_TUTORIAL_REJECTED,
  SET_TUTORIAL,
  SET_SHOW_ADD_EDIT,
} from "../actions/typesTutorials";
import { showToast } from "../assets/js/custom-toastification";

const initialState = {
  tutorial: null,
  tutorials: [],
  fetching: false,
  errors: {},
  showAddEdit: false,
};

const rdcTutorial = (state = initialState, action) => {
  const { type, payload } = action;
  let tutorials = [];
  if (
    [
      FETCH_TUTORIALS_REJECTED,
      INSERT_TUTORIAL_REJECTED,
      UPDATE_TUTORIAL_REJECTED,
      DELETE_TUTORIAL_REJECTED,
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
      FETCH_TUTORIALS_PENDING,
      INSERT_TUTORIAL_PENDING,
      UPDATE_TUTORIAL_PENDING,
      DELETE_TUTORIAL_PENDING,
    ].includes(type)
  ) {
    return {
      ...state,
      fetching: true,
    };
  }

  switch (type) {
    //FETCH_TUTORIALS
    case FETCH_TUTORIALS_FULFILLED:
      return {
        ...state,
        fetching: false,
        tutorials: payload,
      };
    //UPDATE_TUTORIALS
    case INSERT_TUTORIAL_FULFILLED:
      showToast("Kayıt işlemi gerçekleştirildi.");
      return {
        ...state,
        fetching: false,
        tutorials: state.tutorials.concat(payload),
        showAddEdit: false,
      };
    //UPDATE_TUTORIALS
    case UPDATE_TUTORIAL_FULFILLED:
      showToast("Güncelleme işlemi gerçekleştirildi.");
      tutorials = state.tutorials.filter((tutorial) => {
        return tutorial.id !== payload.id;
      });
      return {
        ...state,
        fetching: false,
        tutorials: tutorials.concat(payload),
        showAddEdit: false,
      };

    case DELETE_TUTORIAL_FULFILLED:
      showToast("Silme işlemi gerçekleştirildi.");
      tutorials = state.tutorials.filter((tutorial) => {
        return tutorial.id !== payload;
      });
      return {
        ...state,
        fetching: false,
        tutorials: tutorials,
        showAddEdit: false,
      };
    //SET_TUTORUAL
    case SET_TUTORIAL:
      return {
        ...state,
        tutorial: payload,
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

export default rdcTutorial;
