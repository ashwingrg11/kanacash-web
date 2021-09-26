import React from "react";
import AccountDetail from "../../../src/pages/AccountDetail/AccountDetail";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<AccountDetail />", () => {
  it("AccountDetail renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AccountDetail />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
