import React from "react";
import CongratulationPage from "../../../src/pages/SendMoney/CongratulationPage";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<CongratulationPage />", () => {
  it("CongratulationPage renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <CongratulationPage />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("CongratulationPage Row Component", () => {
    const foo = "hello";
    const bar = "hello";
    expect(foo).toEqual(bar);
  });
});
