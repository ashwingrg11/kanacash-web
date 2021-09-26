import { setUser } from "./Auth";
import * as api from "../../services/axios/authApi";

export const getCurrentUserSuccess = (data) => (dispatch, getState) => {
  dispatch(
    setUser({
      user: data,
      // status: data.status,
    })
  );
};

export const getCurrentUser = () => (dispatch, getState) => {
  api
    .getCurrentUser()
    .then((response) => {
      dispatch(getCurrentUserSuccess(response.data));
    })
    .catch((error) => {
      // console.log("getCurrentUser error", error);
    });
};
 