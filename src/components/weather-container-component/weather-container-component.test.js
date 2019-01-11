import React from 'react';
import { shallow, mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WeatherContainerComponent from './weather-container-component';


describe('WeatherDetailsComponent', () => {

  it('should mount in a full DOM', () => {
    expect(mount(<MuiThemeProvider><WeatherContainerComponent
    /></MuiThemeProvider>)).toBeDefined();
  });

  it('error code should be undefined', () => {
    expect(shallow(<MuiThemeProvider><WeatherContainerComponent/></MuiThemeProvider>).errorCode).toBeUndefined();
  });

});