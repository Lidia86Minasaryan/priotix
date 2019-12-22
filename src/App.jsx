import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import  Page from './Page';
const PUBLIC_URL = '/';

class App extends Component {
    render() {
        return (
            <Router basename={PUBLIC_URL} >
            <Switch >
            <Route exact component = { Page }/>
        </Switch>
        </Router>
    );
    }
}

export default App;
