import { Component } from "react";
import './dashboard.css'
import logo from '../clickify.png'
import axios from "axios";
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullURL: '',
            urls: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/dashboard/', { headers: { 'auth-token': localStorage.getItem('auth_token') } })
            .then(response => {
                if (response.data.done) {
                    this.setState({ urls: response.data.userData.urls })


                }
                else {
                    alert('error Loading URLS. Contact System Admin.')
                }
            })
    }

    loadURL = () => {

    }

    shortenURL() {
        axios.post('http://localhost:3001/dashboard/addNewShortUrl', {
            fullURL: this.state.fullURL
        }, { headers: { 'auth-token': localStorage.getItem('auth_token') } })
            .then(response => {
                if (response.data.done) {
                    alert('Short URL Generated')
                    this.componentDidMount()
                }
                else {
                    alert('Some Error While Adding')
                }
            })
    }

    render() {
        return (
            <div className="container">
                <nav>
                    <div className="nav-left">
                        <img src={logo} alt="Clickify Logo" height="50px" />
                    </div>
                    <div className="nav-right">
                        <button className="btn" >Logout</button>
                    </div>
                </nav>
                <div className="main">
                    <div className="table">
                        <div className="hero-text">
                            Dashboard
                        </div>
                        <div className="input-fields">
                            <input type="text"
                                value={this.state.fullURL}
                                onChange={(e) => { this.setState({ fullURL: e.target.value }) }}
                                placeholder="Enter full Url to shrink" />
                            <button className="btn" onClick={() => { this.shortenURL() }}>Shorten</button>
                        </div>
                        <div>
                            <div className="tbl-header">
                                <table cellPadding={0} cellSpacing={0} border={0}>
                                    <thead>
                                        <tr>
                                            <th>Full URL</th>
                                            <th>ShortURL</th>
                                            <th>Custom Back Part</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="tbl-content">
                                <table cellPadding={0} cellSpacing={0} border={0}>
                                    <tbody>
                                        {this.state.urls ? this.state.urls.map((url, index) => {
                                            return (<tr key={index}>
                                                <td>
                                                    {url.fullURL}
                                                </td>
                                                <td>{url.shortURL}</td>
                                                <td>{url.customBackPart ? url.customBackPart : 'No Custom Back Part'}</td>
                                                <td></td>
                                            </tr>)
                                        }) : 'Loading'}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;