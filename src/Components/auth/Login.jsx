import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInWidget from './SignInWidget';
import { withOktaAuth } from '@okta/okta-react'

export default withOktaAuth (class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            authenticated: null
        };
        this.checkAuthentication();
    }

    async checkAuthentication(){
        const authenticated = await this.props.auth.isAuthenticated();
        if( authenticated !== this.state.authenticated) {
            this.setState({authenticated});
        }
    }

    componentDidMount(){
        this.checkAuthentication();
    }

    onSuccess = (res) => {
        return this.props.auth.redirect({
            sessionToken: res.session.token
        });
    }

    onError = (err) => {
        console.log('error loggin in', err);
    }

    render(){
        if (this.state.authenticated === null) return null;
        return this.state.authenticated ? 
        <Redirect to={{pathname: '/'}}/> :
        <SignInWidget
            baseUri={this.props.baseUri}
            onSuccess={this.onSuccess}
            onError={this.onError}
        />
    }
});



