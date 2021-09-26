import React from "react";
import TransactionLimit from "../../../src/pages/AccountDetail/TransactionLimit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<TransactionLimit />", () => {
  it("TransactionLimit renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={Store}>
          <Router>
            <TransactionLimit />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
