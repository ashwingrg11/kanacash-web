import React from "react";

import LoginReducer from "../../../src/store/reducers/Login";
import * as types from "../../../src/store/actions/constant/ActionTypes";

describe("login reducer", () => {
  const INITIAL_STATE = {};
  it("should return the initial state", () => {
    expect(LoginReducer(undefined, {})).toEqual({});
  });
  it("should handle LOGIN_POST_API_REQUEST ", () => {
    expect(
      LoginReducer(INITIAL_STATE, {
        type: types.LOGIN_POST_API_REQUEST,
      })
    ).toEqual({});
  });
  it("should return the LOGIN_POST_API_SUCCESS", () => {
    expect(
      LoginReducer(INITIAL_STATE, {
        type: types.LOGIN_POST_API_SUCCESS,
      })
    ).toEqual({});
  });
  it("should handle LOGIN_POST_API_FAILURE ", () => {
    expect(
      LoginReducer(INITIAL_STATE, {
        type: types.LOGIN_POST_API_FAILURE,
      })
    ).toEqual({});
  });
});
