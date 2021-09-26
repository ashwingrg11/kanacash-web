import React from "react";
import AdminDropdown from "../../../src/components/CustomDropdown/AdminDropdown";
import { shallow } from "enzyme";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

describe("<AdminDropdown />", () => {
  it("AdminDropdown renders correctly", () => {
      const option = []
    const tree = renderer.create(<AdminDropdown option={option}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
