import React from "react";
import Login from "../../src/pages/Login/Login";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {shallow} from 'enzyme'
import store from "../../src/store/Store";

import renderer from "react-test-renderer";
describe("<Login />", () => {
  it("Login renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
   });

  //  it('Login Modal Component', () => {
  //   const wrapper = shallow( <Provider store={store}>
  //     <Router>  <Login />
  //       </Router>
  //     </Provider>);
  //   expect(wrapper.find('Modal').exists()).toEqual(true);
  //   expect(wrapper.find('div').exists()).toEqual(true);
  // });

});
