import React from "react";
import ReviewDetail from "../../../src/pages/SendMoney/ReviewDetail";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<ReviewDetail />", () => {
  it("ReviewDetail renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <ReviewDetail />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
