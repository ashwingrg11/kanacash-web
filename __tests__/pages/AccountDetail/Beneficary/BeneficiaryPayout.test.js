import React from "react";
import BeneficiaryPayout from "../../../../src/pages/AccountDetail/Beneficiary/BeneficiaryPayout";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<BeneficiaryPayout />", () => {
  it("BeneficiaryPayout renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <BeneficiaryPayout />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
   });
});