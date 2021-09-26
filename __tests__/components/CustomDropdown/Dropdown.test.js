import React from "react";
import Dropdown from "../../../src/components/CustomDropdown/Dropdown";
import { shallow } from "enzyme";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

describe("<Dropdown />", () => {
  it("Dropdown renders correctly", () => {
    const option =[]
    const tree = renderer.create(<Dropdown option={option}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
