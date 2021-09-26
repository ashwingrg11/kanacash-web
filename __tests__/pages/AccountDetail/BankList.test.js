import React from "react";
import BankLIst from "../../../src/pages/AccountDetail/BankLIst";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<BankLIst />", () => {
  it("BankLIst renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <BankLIst />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
