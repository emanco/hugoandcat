import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import { withRouter } from 'react-router-dom';

import './scss/forecast.css';

class ForecastView extends Component {




    render() {

        let $this = this;

        const toToday = (d) => {

            if (d === moment().format("dddd Do")) {
                return "Today "+moment().format("Do");
            } else {
                return d;
            }
        };

        return (

            <div>
                <Moment format="dddd Do" date={$this.props.data[0].date} filter={toToday}/>
                <h4>{$this.props.data[0].title}</h4>
                <p>{$this.props.data[0].description}</p>
                <div>{$this.props.data[0].averageTemp} Celsius</div>
                <div>{Math.round($this.props.data[0].averageTemp * 1.8+32)} Fahrenheit</div>
                <div>{$this.props.data[0].icon}</div>
                <hr/>
            </div>

            );
        }
}

export default withRouter(ForecastView);