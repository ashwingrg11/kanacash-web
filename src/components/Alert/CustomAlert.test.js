import React from 'react';
import CustomAlert from './CustomAlert';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('<SendMoney />', () => {
  it('SendMoney renders correctly', () => {
    const tree = renderer
      .create(
          <CustomAlert />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});