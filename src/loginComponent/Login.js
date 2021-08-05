import React, { Component } from 'react';
import { Link, navigate } from '@reach/router'
import axios from 'axios';
import Logo from '../clickify.png'
import './login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            isFailure: false,
            message: ""
        }
    }
    login() {
        axios.post('http://clickifybackend.herokuapp.com/auth/loginUser', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                if (response.data.done) {
                    localStorage.setItem('auth_token', response.data.token)
                    navigate('/dashboard')
                }
                else {
                    if (response.data.errorType === 'invalidAction') {
                        this.setState({ isFailure: true, message: "already logged in" })
                    }
                    else if (response.data.errorType === 'validation') {
                        this.setState({ isFailure: true, message: response.data.errorObject.details[0].message })
                    }
                    else if (response.data.errorType === 'invalidCredentials') {
                        this.setState({ isFailure: true, message: response.data.errorObject.credentialProperty + 'Invalid Credentials!' })
                    }
                }
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
                        {this.state.isFailure ? <div className="error-message">
                            {this.state.message}
                        </div> : ''}
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
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
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
