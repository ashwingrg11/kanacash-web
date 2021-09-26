import React from "react";
import BeneficiaryList from "../../../../src/pages/AccountDetail/Beneficiary/BeneficiaryList";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<BeneficiaryList />", () => {
  it("BeneficiaryList renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <BeneficiaryList />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
   });
});
