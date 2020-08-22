import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class NavigationBar extends Component {
    render() {
        return (
            // <div className='navbar bg-success'>
            <div className='navigationbar'>
                 <h1 id="navigationbar">
                    {/* font awesome icon */}
                     {/* <i className={this.props.icon} /> { this.props.title } */}
                     <Link to='/'>Toronto Public Library League</Link>
                 </h1>
                 <ul>
                    {/* want to use Link to instead of the anchor tag because by using the anchor tag, you refresh the page
                    when you go back home and the search results are wiped from the App.js's state which you don't want
                    in this situation */}
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/trade'>Trade</Link>
                    </li>
                    <li>
                        <Link to='/player/12345'>12345</Link>
                    </li>
                    <li>
                        <Link to='/compare/'>Compare</Link>
                    </li>
                    <li>
                        <Link to={'/search'}>Search</Link>
                    </li>
                    <div className="dropdown">
                        <button className="dropbtn">Previous Seasons
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <li>
                                <Link to={'/season/16/'}>Season 16</Link>
                            </li>
                            <li>
                                <Link to={'/season/14/'}>Season 14</Link>
                            </li>
                            <li>
                                <Link to={'/season/13/'}>Season 13</Link>
                            </li>
                            <li>
                                <Link to={'/season/12/'}>Season 12</Link>
                            </li>
                            <li>
                                <Link to={'/season/11/'}>Season 11</Link>
                            </li>
                            <li>
                                <Link to={'/season/10/'}>Season 10</Link>
                            </li>
                            <li>
                                <Link to={'/season/9/'}>Season 9</Link>
                            </li>
                            <li>
                                <Link to={'/season/8/'}>Season 8</Link>
                            </li>
                            <li>
                                <Link to={'/season/7/'}>Season 7</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Season 6</Link>
                            </li>
                            <li>
                                <Link to={'/season/5/'}>Season 5</Link>
                            </li>
                        </div>
                    </div>
                    
                </ul>
             </div>
        )
    }
}

export default NavigationBar
