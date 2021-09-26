import React from "react";
import BeneficiaryPayoutMehodList from "../../../src/pages/SendMoney/BeneficiaryPayoutMehodList";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<BeneficiaryPayoutMehodList />", () => {
  it("BeneficiaryPayoutMehodList renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <BeneficiaryPayoutMehodList />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
