import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

// import { withRouter } from 'react-router-dom';

import './scss/forecast.css';

class ForecastView extends Component {


    render() {

        let $this = this;

        // Filter out today in timestamp
        const toToday = (d) => {

            if (d === moment().format("dddd Do")) {
                return "Today "+moment().format("Do");
            } else {
                return d;
            }
        };

        const $section =  "col-xs-12 col-sm-3 col-md-3 forecast day-"+this.props.n,
              $wrapper = "forecast__wrapper forecast__wrapper--"+($this.props.data[0].description.replace(/\s/g, "")),
              $icon = "forecast__icon forecast__icon--"+($this.props.data[0].description.replace(/\s/g, ""));

        return (

                <section className={$section}>
                    <div className={$wrapper}>
                            <Moment format="dddd Do" date={$this.props.data[0].date} filter={toToday} className="forecast__day"/>
                            {/*<h4 className="forecast__title">{$this.props.data[0].title}</h4>*/}
                            <div className="forecast__content">
                                <div className={$icon}></div>
                                <p className="forecast__description">{$this.props.data[0].description}</p>
                            </div>


                            <div className="forecast__temperature">
                                <div className="forecast__celsius">{$this.props.data[0].averageTemp}</div>
                                <span className="forecast__fahrenheit">{Math.round($this.props.data[0].averageTemp * 1.8+32)}</span>
                            </div>
                    </div>
                </section>
            );
        }
}

// export default withRouter(ForecastView);
export default ForecastView;