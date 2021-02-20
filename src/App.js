import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Homepage from "./pages/homepage";
import PageWrapper from './components/pageWrapper';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="content">  
                <Route exact path="/homepage" render={() => {
                  return (
                  <PageWrapper>
                    <Homepage />
                  </PageWrapper>);
                }} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
