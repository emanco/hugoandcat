// Common libraries
import React, { Component } from 'react';

// Include dumb component
import ForecastView from "./view";


class ForecastComponent extends Component {

    componentWillMount() {

    }

    render() {
        return (
            <ForecastView data={this.props.data}/>
        );
    }
}

export default ForecastComponent;