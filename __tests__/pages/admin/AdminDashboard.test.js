import React from "react";
import AdminDashboard from "../../../src/pages/admin/AdminDashboard";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import store from "../../../src/store/Store";

import renderer from "react-test-renderer";
describe("<AdminDashboard />", () => {
  it("AdminDashboard renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AdminDashboard />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
