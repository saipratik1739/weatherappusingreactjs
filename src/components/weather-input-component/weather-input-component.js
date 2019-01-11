import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class WeatherInputComponent extends Component {
    currentTextFieldValue = '';

    /*
    *   This function is called when user click on SUBMIT button
    *   also do validation to make sure, user has ONLY entered numeric values
    */
    onClickSubmitZipcode(prop, event) {
        const reg = /^\d+$/;
        if (reg.test(this.currentTextFieldValue) === true) {
            prop.handleSubmit(event, this.currentTextFieldValue);
        } else {
            alert('please enter only numeric value');
        }
    }

    /*
    *  This function is called when value has changed for zipcode input text field and
    *  This will set new zipcode value to currentTextFieldValue
    */
    onChangeZipcodeField(prop, event) {
        this.currentTextFieldValue = (event && event.target && event.target.value) ? event.target.value : '';
    }

    render() {
        return (
            <Card>
                <CardText> <div className="hide-overflow"><TextField hintText="Enter Zipcode" onChange={this.onChangeZipcodeField.bind(this, this.props)} /></div> </CardText>
                <CardActions> <FlatButton label="Submit" onClick={this.onClickSubmitZipcode.bind(this, this.props)}/> </CardActions>
            </Card>
        );
    }
}

export default WeatherInputComponent