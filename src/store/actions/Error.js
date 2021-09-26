// import {Platform} from 'react-native';

import {
  SET_ERROR,
  RESET_ERROR,
  RESET_STORE,
} from './constant/ActionTypes.js';

import {showModal} from './Modal';

export const setError = error => dispatch => {
  dispatch({
    type: SET_ERROR,
    payload: error,
  });


    setTimeout(() => {
      dispatch(showModal(error));
    }, 300);
  
};

export const clearError = () => {
  return {
    type: RESET_ERROR,
  };
};

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};
