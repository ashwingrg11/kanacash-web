import React from "react";
import AddBeneficiary from "../../../../src/pages/AccountDetail/Beneficiary/AddBeneficiary";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<AddBeneficiary />", () => {
  it("AddBeneficiary renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AddBeneficiary />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
   });
});