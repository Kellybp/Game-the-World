import React, { Component } from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';

export default class PageWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSpinner: true,
            isLoggedIn: true,
        };
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.email) {
                this.setState({
                    ...this.state,
                    showSpinner: false,
                });
            } else {
                this.setState({
                    isLoggedIn: false,
                });
            }
        });
    }
    render() {
        const { showSpinner, isLoggedIn } = this.state;

        if (!isLoggedIn) {
            return <Redirect to={{pathname: "/login"}}/>
        } 

        if (showSpinner) {
            return (
                <div>
                    ...LOADING
                </div>
            );
        } else {
            return (
              <div>
                {this.props.children}
              </div>      
            );
        }
    }
  }