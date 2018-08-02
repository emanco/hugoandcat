import React, { Component } from 'react';
import {location} from '../../constants/endpoints';

import './scss/search.css';

import { withRouter } from 'react-router-dom';

class SearchView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            location:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({value: this.state.value});
        this.props.history.push('/search/' + this.state.value);
        //this.props.history.refresh();
        //this.props.dispatch(getData(this.state.value));
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentWillMount() {
        this.setState({location: this.props.match.params.location !== undefined ? this.props.match.params.location : location});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            //console.log('next props: '+nextProps.location.pathname);
            this.setState({location: nextProps.match.params.location !== undefined ? nextProps.match.params.location : location});
        }
    }


    render() {

        return (
            <header className="container-fluid">
                    <div className="container">

                        <div className="row">
                                <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 search">
                                    <div className="inner">
                                        <form onSubmit={this.handleSubmit}>
                                            <input type="text" className="form-control search__input" placeholder={this.state.location} onChange={this.handleChange}/>

                                            <button type="submit" value="Search" className="search__submit">Find</button>
                                        </form>
                                    </div>
                                </div>
                        </div>

                    </div>
            </header>
        );
    }
}

export default withRouter(SearchView);