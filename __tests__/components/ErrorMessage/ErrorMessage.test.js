import React from "react";
import ErrorMessage from "../../../src/components/ErrorMessage/ErrorMessage";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

describe("<ErrorMessage />", () => {
  it("ErrorMessage renders correctly", () => {
    const tree = renderer.create(<ErrorMessage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
