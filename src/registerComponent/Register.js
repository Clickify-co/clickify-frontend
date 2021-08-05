import React, { Component } from 'react';
import Logo from '../clickify.png';
import axios from 'axios';
import { Link } from '@reach/router'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            fullname: "",
            email: "",
            password: "",
            isSuccess: false,
            isFailure: false,
            message: ""
        }
    }
    register() {
        axios.post('https://clickifybackend.herokuapp.com/auth/registerUser', {
            username: this.state.username,
            password: this.state.password,
            fullname: this.state.fullname,
            emailAddress: this.state.email,
        })
            .then(response => {
                if (response.data.done) {
                    this.setState({isSuccess:true, isFailure:false, message: "User Registered Succesfully."})
                }
                else {
                    if(response.data.errorType==='validation'){
                    this.setState({isSuccess:false, isFailure:true, message: response.data.errorObject.details[0].message})
                        
                    }
                    else if(response.data.errorType==='existingEntity'){
                    this.setState({isSuccess:false, isFailure:true, message: response.data.errorObject.existingProperty+' already exists.'})
                        
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
                            <h1>Sign up and start shortening</h1>
                            <div className="text-gray">
                                Already a user? <Link to='/login'>Sign in</Link>
                            </div>
                        </div>
                        {this.state.isSuccess?<div className="success-message">
                            {this.state.message}
                        </div>:''}
                        {this.state.isFailure?<div className="error-message">
                            {this.state.message}
                        </div>:''}
                        <div className="body-form">
                            <span htmlFor="username" className="text-gray text-left">Enter Username</span>
                            <input type="text" value={this.state.username}
                                onChange={(event) => { this.setState({ username: event.target.value }) }}
                                placeholder='Username' />
                            <br />
                            <span htmlFor="Fullname" className="text-gray text-left">Enter Fullname</span>
                            <input type="text"
                                value={this.state.fullname}
                                onChange={(event) => { this.setState({ fullname: event.target.value }) }}
                                placeholder='Fullname' />
                            <br />
                            <span htmlFor="email" className="text-gray text-left">Enter Email Address</span>
                            <input type="text"
                                value={this.state.email}
                                onChange={(event) => { this.setState({ email: event.target.value }) }}
                                placeholder='Email' />
                            <br />
                            <span htmlFor="username" className="text-gray text-left">Enter Password</span>
                            <input type="password"
                                value={this.state.password}
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                placeholder='Password' />
                            <br />
                            <input type="button" value="Sign up" onClick={() => { this.register() }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
