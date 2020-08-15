import React, { Component, Fragment } from 'react'
import axios from 'axios'
import PlayerProfileCard from './players/PlayerProfileCard';

//todo: move this to home directory
export default class SearchComp extends Component {
    state = {
        serverExecutionTime: null,
        serverResponseStatus: null,
        response: null,
        response: {},
        text: '',
        foundPlayers: []
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    searchUsers(searchTerm) {
        let asciiSearchTerm = encodeURIComponent(searchTerm.trim());
        let endpoint = `/players/individual/person?name=${asciiSearchTerm}`;
        axios.get(endpoint).then(response => {
            const serverResponseData = response.data;
            this.setState( {
                // response: response
                serverExecutionTime: serverResponseData.msExecutionTime,
                serverResponseStatus: response.status,
                foundPlayers: serverResponseData.result
            })
        })
        .catch(err => {
            this.setState({
                serverResponseStatus: err.response.status
            })
        });
    }

    // can set it up like a regular function, 
    // but you would always have to set .bind(this) at the end of each methdo call
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === '') {
            // this.setAlert('Please enter something', 'light');
        } else {
            this.searchUsers(this.state.text);
            this.setState({ 
                text: '',
                serverExecutionTime: null
            });
            
        }
    };

    render() {

        // deconstruct state parameters
        const { foundPlayers, serverResponseStatus, executionTime} = this.state;
        let searchStatus;
        let searchOutput;
        
        const playerGridStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '1rem'
        }

        if (serverResponseStatus != null && serverResponseStatus != 200) {
            searchStatus = <p id="search_execution_time">Player(s) not found...</p>;
        } else {
            
            if (executionTime != null) {
                searchStatus = <p id="search_execution_time">Players found: <b>{ foundPlayers ? foundPlayers.length : 0 }</b> execution time is: { executionTime } ms</p>;
            }

            searchOutput = foundPlayers.map((player, index) =>(
                                <PlayerProfileCard key = { index } player = { player }/>
                            ));
        }

        return (
            <Fragment>
                <div className="container">
                    <form onSubmit = {this.onSubmit} className="form">
                        <input 
                            type="text" 
                            name="text"
                            className="searchPlayers" 
                            placeholder="search for players..." 
                            value = { this.state.text }
                            onChange= { this.onChange }/>

                        <input type="submit"
                                value="search"
                                disabled = { !this.state.text }
                                className = "btn btn-secondary btn-block"/>
                    </form>
                    {/* { showClear && (
                        <button 
                            className = "btn btn-light btn-block" 
                            onClick = { clearUsers }
                        >
                            Clear
                        </button>
                    )} */}
                </div>
                <div className="container">
                    <div style={{padding: "2px" }}>
                        { searchStatus }
                    </div>
                    <div style = { playerGridStyle }>
                        { searchOutput }
                    </div>
                </div>
            </Fragment>
        )
    }
}
