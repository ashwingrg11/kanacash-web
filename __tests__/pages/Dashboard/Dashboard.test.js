import React from "react";
import Dashboard from "../../../src/pages/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<Dashboard />", () => {
  it("Dashboard renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Dashboard />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
