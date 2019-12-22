import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Search from './components/Search/Search';

export default class Page extends Component {
    render() {
          return (
              <div>
                  <Switch>
                      <Route path='/search' component={Search}/>
                      <Redirect to="/search" />
                  </Switch>
              </div>
          )
      }
}
