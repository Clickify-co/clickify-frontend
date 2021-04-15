import React, { Component } from 'react';
import Logo from '../clickify.png';
import { Link } from '@reach/router'

class Register extends Component {
    render() {
        return (
            <div>
                <div className="center">
                    <div className="logo-container">
                        <img src={Logo} height='50px' alt="" />
                    </div>
                    <div className="form-box">
                        <div className="heading-form">
                            <h1>Sign up and start shortening</h1>
                            <div className="text-gray">
                                Already a user? <Link to='/login'>Sign in</Link>
                            </div>
                        </div>
                        <div className="body-form">
                            <span htmlFor="username" className="text-gray text-left">Enter Username</span>
                            <input type="text" placeholder='Username' />
                            <br />
                            <span htmlFor="email" className="text-gray text-left">Enter Email Address</span>
                            <input type="text" placeholder='Email' />
                            <br />
                            <span htmlFor="username" className="text-gray text-left">Enter Password</span>
                            <input type="password" placeholder='Password' />
                            <br />
                            <input type="button" value="Sign up" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
