// Common libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Include dumb component
import ForecastView from "./view";

import Transition from "react-transition-group/Transition"
import TransitionGroup from "react-transition-group/TransitionGroup"

import {TweenMax} from 'gsap';


const enterAnimation = obj => {
    // TweenLite.fromTo(obj.el, 0.5, {alpha:0},{alpha:1, delay:obj.props.n*0.1});
};

const exitAnimation = obj => {
    // TweenLite.fromTo(obj.el, 0.3, {alpha:1},{alpha:0, delay:obj.props.n*0.1});
};

const timeout = { enter: 1000, exit: 1000 };

class ForecastComponent extends Component {

    constructor(props) {
        super(props);
        this.el = {};
    }

    componentWillMount() {

    }

    componentDidMount() {

        this.el = ReactDOM.findDOMNode(this);
        let $icon = '.day-'+this.props.n+' .forecast__icon';

        TweenMax.fromTo(this.el, 0.5, {alpha:0, delay:this.props.n+0.1}, {alpha:1, delay:this.props.n*0.1});
        TweenMax.fromTo($icon, 0.5, {scale:0}, {scale:1, delay:this.props.n*0.2, ease:"Cubic.easeOut"});

    }

    render() {

        return (
            <TransitionGroup component={null}>
                <Transition
                    key={this.props.n}
                    timeout={timeout}
                    mountOnEnter={true}
                    unmountOnExit={true}
                    onEnter={enterAnimation(this)}
                    onExit={exitAnimation(this)}
                >
                    <ForecastView data={this.props.data} n={this.props.n} />
                </Transition>
            </TransitionGroup>
        );
    }
}

export default ForecastComponent;