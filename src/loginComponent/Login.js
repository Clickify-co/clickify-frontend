import React, { Component } from 'react';
import { Link } from '@reach/router'
import Logo from '../clickify.png'
import './login.css'

class Login extends Component {
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
                            <input type="text" placeholder='Username' />
                            <br />
                            <span htmlFor="username" className="text-gray text-left">Enter Password</span>
                            <input type="password" placeholder='Password' />
                            <br />
                            <Link to='/register' className='text-left'>Forgot Password?</Link>
                            <input type="button" value="Sign in" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
