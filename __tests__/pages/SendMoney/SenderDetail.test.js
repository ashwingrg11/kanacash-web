import React from "react";
import SenderDetails from "../../../src/pages/SendMoney/SenderDetails";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<SenderDetails />", () => {
  it("SenderDetails renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <SenderDetails />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
