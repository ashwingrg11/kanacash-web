import React from "react";
import AddBankForm from "../../../../src/pages/AccountDetail/Beneficiary/AddBankForm";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<AddBankForm />", () => {

  it("AddBankForm renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AddBankForm/>
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
