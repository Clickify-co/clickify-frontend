import React, { Component } from 'react';
import { Router } from "@reach/router"

import './base.css'

import Home from './homeComponent/Home'
import Login from './loginComponent/Login'
import Register from './registerComponent/Register'
import Dashboard from './dashboardComponent/Dashboard'
import ShortURLComponent from './shortURLComponent/shortURLComponent';
import NotFoundComponent from './notFoundComponent/notFoundComponent'

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Home path='/' />
                    <NotFoundComponent path='/404NotFound' />
                    <Login path='/login' />
                    <Register path='/register' />
                    <Dashboard path='/dashboard' />
                    <ShortURLComponent path='/:shortURL' />
                </Router>
            </div>
        );
    }
}

export default App;
