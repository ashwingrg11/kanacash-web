import React from "react";
import InputDropdown from "../../../src/components/CustomDropdown/InputDropdown";
import { shallow } from "enzyme";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

describe("<InputDropdown />", () => {
  it("InputDropdown renders correctly", () => {
      const option = []
    const tree = renderer.create(<InputDropdown option={option}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
