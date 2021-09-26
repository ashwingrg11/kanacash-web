import React from "react";
import CountryChooser from "../../../src/pages/CountryChooser/CountryChooser";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<CountryChooser />", () => {
  it("CountryChooser renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <CountryChooser />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
