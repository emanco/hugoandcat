// libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//store
import { applyMiddleware, createStore, combineReducers } from 'redux';

//pages
import Summarypage from "./pages/summary/page";

//reducers
import summaryReducer from './pages/summary/reducers';

// styles
import "./scss/base/0_fonts.css";
import "./scss/base/1_vars.css";
import "./scss/base/2_mixins.css";
import "./scss/base/3_typography.css";
import "./scss/base/4_global.css";
import "./scss/base/5_helper.css";
import "./scss/base/bootstrap_overrides.css";
import "./scss/base/main.css";


let store = createStore(combineReducers({ summaryReducer }), applyMiddleware(promiseMiddleware(), thunk, logger));


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Summarypage} />
                    <Route exact path="/search/" component={Summarypage} />
                    <Route path="/search/:location" component={Summarypage} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

export default store;

