import React, { Component } from 'react';
import { Link } from '@reach/router'
import axios from 'axios';
import Logo from '../clickify.png'
import './login.css'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }
    login() {
        axios.post('http://localhost:3001/auth/loginUser', {
            username: this.state.username,
            password: this.state.password
        })
    }
    render() {
        return (
            <div>
                <div className="center">
                    <div className="logo-container">
                        <img src={Logo} height='50px' alt="" />
                    </div>
                    <div className="form-box">
                        <div className="heading-form">
                            <h1>Login and Start generating leads</h1>
                            <div className="text-gray">
                                Do not have an account? <Link to='/register'>Sign up</Link>
                            </div>
                        </div>
                        <div className="body-form">
                            <span htmlFor="username" className="text-gray text-left">Enter Username</span>
                            <input type="text"
                                value={this.state.username}
                                onChange={(e) => { this.setState({ username: e.target.value }) }}
                                placeholder='Username' />
                            <br />
                            <span htmlFor="password" className="text-gray text-left">Enter Password</span>
                            <input type="password"
                                value={this.state.password}
                                onChange={(e) => { this.setState({ password: e.target.password }) }}
                                placeholder='Password' />
                            <br />
                            <Link to='/register' className='text-left'>Forgot Password?</Link>
                            <input type="button" onClick={() => { this.login() }} value="Sign in" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
