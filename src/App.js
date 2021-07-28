import React, { Component } from 'react';
import { Router } from "@reach/router"

import './base.css'

import Home from './homeComponent/Home'
import Login from './loginComponent/Login'
import Register from './registerComponent/Register'
import Dashboard from './dashboardComponent/Dashboard'

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Home path='/' />
                    <Login path='/login' />
                    <Register path='/register' />
                    <Dashboard path='/dashboard' />
                </Router>
            </div>
        );
    }
}

export default App;
