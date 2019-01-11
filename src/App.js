import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WeatherContainerComponent from './components/weather-container-component/weather-container-component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <WeatherContainerComponent></WeatherContainerComponent>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
