import React, { Component } from 'react';
import axios from 'axios';
import WeatherDetailsComponent from '../weather-detail-component/weather-details-component';
import WeatherInputComponent from '../weather-input-component/weather-input-component';
import environment from '../../environment/environment';

class WeatherContainerComponent extends Component {
    constructor(props) {
        super(props);
        // description of the weather, the temperature in Fahrenheit, wind speed and humidity.
		this.state = {
            weatherData: {},
            zipCode: '08824', // default value set
            name: 'New Brunswick', // default value set
            hasError: false,
            textValue: '',
            isLoading: false
        };
        this.URL_BY_ZIPCODE = environment.urlByZipcode;
        this.APP_ID = environment.appId;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.errorCode = null;
        this.errorMessage = null;
    }

    /*
    * This is a life-cycle hook method and right place to fetch data from server
    * This will make sure component is mount alredy
    */
    componentDidMount() {
        this.fetchWeatherDetailsByZipcode(this.state.zipCode);
    }

    /*
    * This is will parse/massage the data and set it to state
    */
    parseResponseAndSetDataToState(response) {
        // desc
        const weatherArray = (response && response.data && response.data.weather) ? response.data.weather: [];
        // temp ->  F = 9/5 * (K - 273) + 32
        const tempInKelvin = (response && response.data && response.data.main && response.data.main.temp) ? response.data.main.temp: '';
        let tempInFahrenheit = (tempInKelvin) ? 9/5 * (tempInKelvin - 273) + 32 : 0;
        tempInFahrenheit = Math.round(tempInFahrenheit);
        //wind speed
        const windSpeed = (response && response.data && response.data.wind && response.data.wind.speed) ? response.data.wind.speed: '';
        // humidity
        const humidity = (response && response.data && response.data.main && response.data.main.humidity) ? response.data.main.humidity: '';
        const payload = {
            weatherDescription: weatherArray,
            temperature: tempInFahrenheit,
            windSpeed: windSpeed,
            humidity: humidity
        };
        this.setState({weatherData: payload});
        this.setState({name: response.data.name});
    }

    /*
    *  This is a function will get weather details by zipcode from API
    */
    fetchWeatherDetailsByZipcode(zipCode) {
        this.setState({hasError: false}); // reset err flag to false
        this.setState({isLoading: true}); // loading icon visible
        const URL = this.URL_BY_ZIPCODE + '?zip=' + zipCode + ',us&appid=' + this.APP_ID;
        axios.get(URL)
        .then(function(response) {
            this.setState({isLoading: false}); // loading icon hidden
            this.parseResponseAndSetDataToState(response);
        }.bind(this))
        .catch(function(error) {
            this.setState({isLoading: false}); // loading icon hidden
            this.errorCode = (error && error.response && error.response.status) ? error.response.status : null;
            this.errorMessage = (error && error.response && error.response.statusText) ? error.response.statusText : null;
            this.setState({hasError: true});
        }.bind(this));
    }

    /*
    *   This function is called when user click on SUBMIT button
    */
    handleSubmit(event, zipcodeTextFieldValue) {
        if(event) {
            this.setState({zipCode: zipcodeTextFieldValue});
            this.fetchWeatherDetailsByZipcode(zipcodeTextFieldValue);
        }
    }

    /*
        This is a life-cycle hook method
    */
    render() {
        return (
          <div className="mrgnTp100">
            <div className="left-side mrgnRt20 mrgnLft20 disp-inline-blk">
                <WeatherInputComponent
                    handleSubmit = {this.handleSubmit}
                    currentZipCodeVal = {this.state.zipCode}
                />
            </div>

            <div className="right-side mrgnRt20 mrgnLft20 disp-inline-blk">
                <WeatherDetailsComponent
                    hasErr = {this.state.hasError}
                    currentZipCode = {this.state.zipCode}
                    currentPlaceName = {this.state.name}
                    errorCode = {this.errorCode}
                    errorMessage =  {this.errorMessage}
                    weatherDetails = {this.state.weatherData}
                    isLoading = {this.state.isLoading}
                />
            </div>

          </div>
        );
      }
}
export default WeatherContainerComponent;