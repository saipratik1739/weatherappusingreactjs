import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import environment from '../../environment/environment';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class WeatherDetailsComponent extends Component {
    createTable = (weatherDetails) => {
        let table = []
        if (weatherDetails && weatherDetails.weatherDescription) {
            for (let i = 0; i < weatherDetails.weatherDescription.length; i++) {
                const detailsObj = weatherDetails.weatherDescription[i];
                const imgURL = environment.imageURL + detailsObj['icon'] + '.png';
                table.push(
                    <Card key={Math.random()}>
                        <CardText>
                            <div className="img-container disp-inline-blk mrgnRt20">
                                <img src={imgURL} alt="weather-logo"></img>
                            </div>
                            <div className="detail-container disp-inline-blk">
                                <div className="txt-align-lft">Description: <span className="w-details-disp">{detailsObj['description']}</span></div>
                                <div className="txt-align-lft">Temperature: <span className="w-details-disp">{weatherDetails.temperature} (&#8457;)</span></div>
                                <div className="txt-align-lft">Wind Speed: <span className="w-details-disp">{weatherDetails.windSpeed}</span></div>
                                <div className="txt-align-lft">Humidity: <span className="w-details-disp">{weatherDetails.humidity}</span></div>
                            </div>
                        </CardText>
                    </Card>
                )

            }

        }
        return table
    }
    render() {
        const style = {
            container: {
                position: 'relative',
            },
            refresh: {
                display: 'inline-block',
                position: 'relative',
            },
        };
        const hasErr = this.props.hasErr.toString();
        const errCode = this.props.errorCode;
        const errMsg = this.props.errorMessage;
        const currentZipCode = this.props.currentZipCode;
        const currentPlaceName = this.props.currentPlaceName;
        const weatherDetails = this.props.weatherDetails;
        const isLoading = this.props.isLoading.toString();
        return (
            <Card>
                <CardTitle title="Weather Information"/>
                    <div>
                        {isLoading === 'true' ? (
                            <div className="mrgnRt30P" style={style.container}>
                                <RefreshIndicator
                                    size={50}
                                    left={70}
                                    top={0}
                                    loadingColor="#FF9800"
                                    status="loading"
                                    style={style.refresh}
                                />
                            </div>
                        ) : (
                            <div className="detail-parent-elem">
                                <span>
                                    <span>Current zipcode: </span>
                                    <span className="w-details-disp">{currentZipCode}</span>
                                    <span> - </span>
                                    <span className="w-details-disp">{currentPlaceName}</span>
                                </span>

                                <div>
                                    <CardText>
                                        {hasErr === 'true' &&
                                            <div className="disp-error">
                                                <span> {errCode}</span> -
                                                <span> {errMsg}</span>
                                            </div>
                                        }
                                        {hasErr === 'false' &&
                                            <Card>
                                                {this.createTable(weatherDetails)}
                                            </Card>
                                        }
                                    </CardText>
                                </div>
                            </div>
                        )}
                    </div>



        </Card>
        );
    }
}

export default WeatherDetailsComponent