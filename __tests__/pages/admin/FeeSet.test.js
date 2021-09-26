import React from "react";
import FeeSet from "../../../src/pages/admin/FeeSet";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<FeeSet />", () => {
  it("FeeSet renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <FeeSet />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
