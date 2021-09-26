import React from "react";
import BeneficiaryCreate from "../../../src/pages/SendMoney/BeneficiaryCreate";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<BeneficiaryCreate />", () => {
  it("BeneficiaryCreate renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <BeneficiaryCreate />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
