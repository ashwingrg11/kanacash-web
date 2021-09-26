import React from "react";
import PaymentInfomation from "../../../src/pages/SendMoney/PaymentInfomation";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<PaymentInfomation />", () => {
  it("PaymentInfomation renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <PaymentInfomation />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
