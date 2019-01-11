import React from 'react';
import { shallow, mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WeatherDetailsComponent from './weather-details-component';


describe('WeatherDetailsComponent', () => {

  it('should mount in a full DOM', () => {
    const hasErr = true;
    const isLoading = false;
    expect(mount(<MuiThemeProvider><WeatherDetailsComponent
        hasErr = {hasErr}
        isLoading = {isLoading}
    /></MuiThemeProvider>).find('.disp-error').length).toBe(1);
  });

  it('error message should be hidden and NOT selectable by class ".disp-error" ',() => {
    const hasErr = false;
    expect(shallow(<MuiThemeProvider><WeatherDetailsComponent
        hasErr = {hasErr}/>
    </MuiThemeProvider>).is('.disp-error')).toBe(false);
  });

  it('loading icon should be NOT be visible ',() => {
    const isLoading = false;
    expect(shallow(<MuiThemeProvider><WeatherDetailsComponent
        hasErr = {isLoading}/>
    </MuiThemeProvider>).is('.mrgnRt30P')).toBe(false);
  });
});