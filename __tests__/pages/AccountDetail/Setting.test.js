import React from "react";
import Setting from "../../../src/pages/AccountDetail/Setting";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<Setting />", () => {
  it("Setting renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Setting />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
