import {
  PRESENT_LOADER,
  HIDE_LOADER,
} from './constant/ActionTypes';

export const showLoader = () => {
  return {
    type: PRESENT_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};
