import {
  PRESENT_MODAL,
  HIDE_MODAL,
  RESET_STORE,
} from './constant/ActionTypes';

import {clearError} from './Error';

export const showModal = modalPayload => {
  return {
    type: PRESENT_MODAL,
    payload: modalPayload,
  };
};

export const hideModal = () => dispatch => {
  dispatch({
    type: HIDE_MODAL,
  });

  dispatch(clearError());
};

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};
