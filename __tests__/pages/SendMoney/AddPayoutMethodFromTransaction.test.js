import React from "react";
import AddPayoutMethodFromTransaction from "../../../src/pages/SendMoney/AddPayoutMethodFromTransaction";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<AddPayoutMethodFromTransaction />", () => {
  it("AddPayoutMethodFromTransaction renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AddPayoutMethodFromTransaction />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
