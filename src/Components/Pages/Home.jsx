import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react'

export default withOktaAuth (class Home extends Component{
    
    state = {authenticated: null};       


    checkAuthentication = async()=>{
        const authenticated = await this.props.auth.isAuthenticated();
        if( authenticated !== this.state.authenticated) {
            this.setState({authenticated});
        }
    }

    async componentDidMount(){
        this.checkAuthentication();
    }

    async componentDidUpdate(){
        this.checkAuthentication();
    }

    login = async()=>{
        this.props.auth.login('/');
    }

    logout = async()=>{
        this.props.auth.logout('/');
    }

    render(){
        if (this.state.authenticated === null) return null;
        
        const mainContent = this.state.authenticated ? (
            <div className='welcome-head'>
                Welcome Book with Hooks
                <button onClick={this.logout}>Logout</button>
            </div>
        ):(
            <div className='welcome-head'>
                Welcome Book with Hooks
                <p>You need to sign-in to use the application</p>
                <button onClick={this.login}>Login</button>
            </div>

        );
        return(
            <div className='welcome'>
                HELLO
                {mainContent}
            </div>
        )
    }
});



