import React from "react";
import BeneficiaryDetails from "../../../src/pages/SendMoney/BeneficiaryDetails";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<BeneficiaryDetails />", () => {
  it("BeneficiaryDetails renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <BeneficiaryDetails />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
