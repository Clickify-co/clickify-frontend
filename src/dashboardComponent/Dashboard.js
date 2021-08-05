import { Component } from "react";
import './dashboard.css'
import logo from '../clickify.png'
import axios from "axios";
import { navigate } from "@reach/router";
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullURL: '',
            urls: [],
            newBackPart: []
        }
    }

    logout() {
        localStorage.removeItem('auth_token');
        navigate('/login')
    }

    componentDidMount() {
        axios.get('https://clickifybackend.herokuapp.com/dashboard/', { headers: { 'auth-token': localStorage.getItem('auth_token') } })
            .then(response => {
                if (response.data.done) {
                    this.setState({ urls: response.data.userData.urls, newBackPart: response.data.userData.urls.map(() => '') })
                    console.log(response.data.userData.urls)
                }
                else {
                    alert('Error Loading URLS. Try Loggin in again.')
                    navigate('/login')
                }
            })
    }

    loadURL = () => {

    }

    shortenURL() {
        axios.post('https://clickifybackend.herokuapp.com/dashboard/addNewShortUrl', {
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

    deleteShortURL(index) {
        axios.post('https://clickifybackend.herokuapp.com/dashboard/deleteShortURL',
            { id: this.state.urls[index]._id },
            { headers: { 'auth-token': localStorage.getItem('auth_token') } })
            .then(response => {
                if (response.data.done) {
                    alert('URL Deleted Succesfully')
                    this.componentDidMount()
                }
                else {
                    alert('Some Error Occurred.')
                }
            })
    }

    handleUpdateField(e, index) {
        let items = [...this.state.urls]
        items[index].customBackPart = e.target.value
        this.setState({ urls: items })
    }
    handleUpdateFieldNewBackPart(e, index) {
        let items = [...this.state.newBackPart]
        items[index] = e.target.value
        this.setState({ newBackPart: items })
    }

    updateURL(index) {
        console.log(this.state.urls[index].customBackPart ? this.state.urls[index].customBackPart : this.state.newBackPart[index]);
        axios.post('https://clickifybackend.herokuapp.com/dashboard/editShortURL',
            {
                shortURL: this.state.urls[index].shortURL,
                customBackPart: this.state.urls[index].customBackPart ? this.state.urls[index].customBackPart : this.state.newBackPart[index]
            },
            { headers: { 'auth-token': localStorage.getItem('auth_token') } })
            .then(response => {
                if (response.data.done) {
                    alert('URL Back Part Updated Succesfully')
                    this.componentDidMount()
                }
                else if (response.data.errorType === 'existingEntity') {
                    alert('URL Not updated. Back part was taken.')
                }
                else {
                    alert('Unknown Error Occurred')
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
                        <button className="btn" onClick={() => { this.logout() }}>Logout</button>
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
                                            <th>Visits</th>
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
                                                <td>
                                                    {url.customBackPart ? <input type="text" value={this.state.urls[index].customBackPart}
                                                        onChange={(e) => { this.handleUpdateField(e, index) }} /> :
                                                        <input value={this.state.newBackPart[index]}
                                                            onChange={(e) => { this.handleUpdateFieldNewBackPart(e, index) }}
                                                            type="text" placeholder='Add Custom Back Part' />
                                                    }
                                                    <button className="" onClick={() => this.updateURL(index)}>
                                                        Update
                                                    </button>
                                                </td>
                                                <td>{url.numberOfVisits}</td>
                                                <td>
                                                    <button onClick={() => { this.deleteShortURL(index) }} className="btn">Delete</button>
                                                </td>
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