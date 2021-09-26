import React from 'react';
import InputField from './InputField';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('<InputField />', () => {
  it('InputField renders correctly', () => {
    const tree = renderer
      .create(
          <InputField />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});