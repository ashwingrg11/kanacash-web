import React from "react";
import AddBankFromTransaction from "../../../src/pages/SendMoney/AddBankFromTransaction";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<AddBankFromTransaction />", () => {
  it("AddBankFromTransaction renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AddBankFromTransaction />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
