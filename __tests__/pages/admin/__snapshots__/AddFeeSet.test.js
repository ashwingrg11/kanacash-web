import React from "react";
import AddFeeSet from "../../../../src/pages/admin/AddFeeSet";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<AddFeeSet />", () => {
  it("AddFeeSet renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AddFeeSet />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
