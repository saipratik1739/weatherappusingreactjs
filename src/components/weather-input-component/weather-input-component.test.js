import React from 'react';
import { shallow, mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WeatherInputComponent from './weather-input-component';

describe('WeatherInputComponent', () => {

  it('should mount in a full DOM', () => {
    expect(mount(<MuiThemeProvider><WeatherInputComponent /></MuiThemeProvider>).find('.hide-overflow').length).toBe(1);
  });

  it('should NOT be selectable by class ".foo" ',() => {
    expect(shallow(<MuiThemeProvider><WeatherInputComponent /></MuiThemeProvider>).is('.foo')).toBe(false);
  });

  it('should be selectable by class ".hide-overflow" ',() => {
    expect(shallow(<MuiThemeProvider><WeatherInputComponent /></MuiThemeProvider>).is('.hide-overflow')).toBe(false);
  });

  it('should handle SUBMIT click event', () => {
    const f = jest.fn();
    const wrapper = mount(<MuiThemeProvider><WeatherInputComponent onClick={f}/></MuiThemeProvider>);
    wrapper.find(WeatherInputComponent).last().simulate('click');
    expect(WeatherInputComponent.onClickSubmitZipcode).toBe.true;
  });

  it('should handle OnChange event when user type zipcode', () => {
    const f = jest.fn();
    const wrapper = mount(<MuiThemeProvider><WeatherInputComponent onChange={f}/></MuiThemeProvider>);
    wrapper.find(WeatherInputComponent).simulate('change');
  });

});