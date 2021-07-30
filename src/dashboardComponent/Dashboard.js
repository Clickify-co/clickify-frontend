import { Component } from "react";
import './dashboard.css'
import logo from '../clickify.png'
class Dashboard extends Component{
    constructor(props){
        super()
    }


   render(){
       return(
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
        <div className="hero-text">
            Dashboard
        </div>
        <div className="input-fields">
            <input type="text" placeholder="Enter a title for short link"/>
            <input type="text" placeholder="Enter full Url to shrink"/>
            <button className="btn">Shorten</button>
        </div>
        <div className="table">
            <div className="heading">
                Your Links
            </div>
            <div>
        <div className="tbl-header">
          <table cellPadding={0} cellSpacing={0} border={0}>
            <thead>
              <tr>
                <th>Title</th>
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
              <tr>
                <td>AAC</td>
                <td>AUSTRALIAN COMPANY </td>
                <td>$1.38</td>
                <td>+2.01</td>
                <td>-0.36%</td>
              </tr>
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