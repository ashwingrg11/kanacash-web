import React from "react";
import DebitCard from "../../../src/pages/AccountDetail/DebitCard";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<DebitCard />", () => {
  it("DebitCard renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <DebitCard />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
