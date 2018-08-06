import React, { Component } from 'react';

import { connect } from 'react-redux';

import {getData} from "./actions";
import ForecastComponent from "../../components/forecast/component";
import SearchView from "../../components/search/view";
import FooterView from "../../components/footer/view";

import moment from 'moment';

import Ionicon from 'react-ionicons';

class Summarypage extends Component {

    componentWillMount() {
        //this.props.dispatch(getData(this.props.match.params.customerid));
        this.props.dispatch(getData(this.props.match.params.location));
    }

    componentDidMount() {
        // console.log('mount');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            //console.log('next props: '+nextProps.location.pathname);
            this.props.dispatch(getData(nextProps.match.params.location));
        }
    }

  render() {

      let $this = this,
          $days = [],
          $week = [];


      // this filters out the most frequent record of the array
      function mode(arr){
          return arr.sort((a,b) =>
              arr.filter(v => v===a).length
              - arr.filter(v => v===b).length
          ).pop();
      }


      if (this.props.loading === true || typeof this.props.payload === 'undefined') {
          return (
              <div>
                  <SearchView/>

                  <div className="main container">
                      <div className="row">
                          <div className="main__loading">
                              <p> <Ionicon icon="ios-sync" fontSize="90px" color="#b2b2b2" rotate={true} /></p>
                          </div>
                      </div>
                  </div>

                  <FooterView/>
              </div>
          );
      }


      if (this.props.success === false ) {

          let $notice = this.props.payload.response.status === 404 ? 'Ooops, it seems like this location does not exist on planet earth!' : '<strong>Error:</strong> '+this.props.payload.message;

          return (
              <div>
                  <SearchView/>

                  <div className="main container">
                      <div className="row">
                          <p className="main__notice">{$notice}</p>
                      </div>
                  </div>

                  <FooterView/>
              </div>
          );

      } else {

          // prepare data in day groups as the free API does not provide daily forecasts, might be part of the test? ;)
          const firstDay = $this.props.payload[0].data.list[0].dt_txt; // this is the starting day

          for (let i=0; i<4; i++) {
              let nextDay = moment(firstDay).add(i,'days').format("dddd");  // grab the week names from the data array
              $week.push(nextDay);  // and create a guiding week array for later
          }

          $week.forEach(function(d){
              // use week day name as group criteria
              let group = $this.props.payload[0].data.list.filter((day) => moment(day.dt_txt).format("dddd") === d);
              $days.push(group);
          });

      }




      return (
          <div>

              <SearchView/>


              <div className="main container">
                  <div className="row">
                  {$days.map(function(day, i){

                      let $date = '',           // store the timestamp
                          $weekDay = '',        // stores the weekday
                          $temps = [],          // store all temperatures
                          $weatherTitles = [],  // store all weather titles
                          $weatherDescrs = [],  // store all weather descriptions
                          $weatherIcons = [],   // store all weather icons
                          $weatherClouds = [],
                          average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;  // calculates average

                      day.forEach(function(data, i){
                          $weekDay = moment(data.dt_txt).format("dddd Do"); // convert timestamp in readable weekday
                          $date = $date === '' ? data.dt_txt : $date;

                          let temp = data.main.temp - 273.15,               // convert kelvin into celsius
                              weatherTitle = data.weather[0].main,          // stores titles separately as they might have different descriptions
                              weatherDescr = data.weather[0].description,   // same as above
                              weatherCloud = data.clouds.all,
                              icon = data.weather[0].icon;                  // same for the icon stored as string

                          $weatherTitles.push(weatherTitle);
                          $weatherDescrs.push(weatherDescr);
                          $weatherClouds.push(weatherCloud);
                          $weatherIcons.push(icon);
                          $temps.push(temp);

                          // console.log(data);
                      });

                      let $averageTemp = Math.round(average($temps)),
                          $dailyWeatherTitle = mode($weatherTitles),
                          $dailyWeatherDescr = mode($weatherDescrs),
                          $dailyWeatherIcon = mode($weatherIcons),
                          $dailyWeatherClouds = average($weatherClouds);

                      // Correct Clear Sky if there is a certain amount of clouds during the day
                      if ($dailyWeatherClouds > 10 && $dailyWeatherTitle === 'Clear') {
                          $dailyWeatherTitle = 'Clouds';
                          $dailyWeatherDescr = 'few clouds';
                          $dailyWeatherIcon = '02d'
                      }

                      // console.log($dailyWeatherClouds);

                      // console.log($weekDay);
                      // console.log($averageTemp);
                      //
                      // console.log($dailyWeatherTitle);
                      // console.log($dailyWeatherDescr);
                      // console.log($dailyWeatherIcon);

                      // create custom data into array
                      const $data = [{
                          'date':$date,
                          'weekDay':$weekDay,
                          'averageTemp':$averageTemp,
                          'title':$dailyWeatherTitle,
                          'description':$dailyWeatherDescr,
                          'icon':$dailyWeatherIcon
                      }];

                      // parse it into component for display
                      return <ForecastComponent key={i} n={i} data={$data}/>;
                  })}
                  </div>
              </div>

              <FooterView/>
          </div>

      );
  }
}

//export default Summarypage;


export default connect((state) => {
    return state.summaryReducer;
})(Summarypage);