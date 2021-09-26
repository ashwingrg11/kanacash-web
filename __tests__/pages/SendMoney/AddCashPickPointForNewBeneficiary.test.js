import React from "react";
import AddCashPickPointForNewBeneficiary from "../../../src/pages/SendMoney/AddCashPickPointForNewBeneficiary";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<AddCashPickPointForNewBeneficiary />", () => {
  it("AddCashPickPointForNewBeneficiary renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AddCashPickPointForNewBeneficiary />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
