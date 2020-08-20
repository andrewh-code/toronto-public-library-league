import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';


export class RecordsComponents extends Component {
    
    state = {
        serverResponseData: {},
        code: null,
        status: null,
        id: null,
        players: [],
        seasonId: null,
        sexFilter: null
    };

    // arguments to the component
    static propTypes = {
        seasonId: PropTypes.number.isRequired
    };

    componentDidMount() {
        const seasonId = this.props.seasonId;
        let endpoint = "/players/season/" + seasonId;
        axios.get(endpoint).then(result => {
            const serverResponseData = result.data;
            const status = result.data.status;
            const code = result.data.code;
            const id = result.data.id;
            const players = result.data.result;
            this.setState({
                serverResponseData,
                code,
                status,
                id,
                players,
                seasonId
            })
        })
    }

    componentDidUpdate() {
        // this.props.retrievePlayers(this.props.match.params);
        if (this.props.match.params.seasonId !== this.state.seasonId) {
            const seasonId = this.props.seasonId;
            let endpoint = "/players/season/" + seasonId;
            axios.get(endpoint).then(result => {
                const serverResponseData = result.data;
                const status = result.data.status;
                const code = result.data.code;
                const id = result.data.id;
                const players = result.data.result;
                this.setState({
                    serverResponseData,
                    code,
                    status,
                    id,
                    players,
                    seasonId
                })
            })
        }
    }

    femalePlayers = this.state.players.filter(player => player.sex === "F");
    malePlayers = this.state.players.filter(player => player.sex === "M");
    
    renderTableHeader() {
        // let header = Object.keys(this.state.players[0]);
        // let statsHeader = Object.keys(this.state.players[0].stats);
        let header = [
            "rank",
            "Name",
            "Sex",
            "Salary",
            "Goals",
            "Assists",
            "2nd Assists",
            "ds",
            "TA",
            "RE",
            "Assist : TA",
            "D : TO",
            "Traded",
            "W"
        ]
        // header.push(...statsHeader);    // spread operator
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    };

    renderTableData(sex) {
        let allPlayers = [];
        if (sex) {
            allPlayers = this.state.players.filter(player => player.sex === sex);
        } else {
            allPlayers = this.state.players;
        }
        // return this.state.players.map((player, index) => {
        return allPlayers.map((player, index) => {
            const { name, sex } = player;
            const {
                assistThrowawayRatio,
                assists,
                dTurnoverRatio,
                ds,
                goals,
                receiverError,
                salary,
                secondAssists,
                throwaways,
                timesTraded,
                wins
            } = player.stats;
            
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td><b>{name}</b></td>
                    <td>{sex}</td>
                    <td>{salary}</td>
                    <td>{goals}</td>
                    <td>{assists}</td>
                    <td>{secondAssists}</td>
                    <td>{ds}</td>
                    <td>{throwaways}</td>
                    <td>{receiverError}</td>
                    <td>{assistThrowawayRatio}</td>
                    <td>{dTurnoverRatio}</td>
                    <td>{timesTraded}</td>
                    <td>{wins}</td>
                </tr>
            )
        })
    }

    showTable(sex) {
        return (
            <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData(sex)}
            </tbody>
        )
    }

    changeSexFilter(sex){
        this.setState({
            sexFilter: sex
        });
    }

    render() {
        // deconstruct prop
        let {seasonId} = this.props;

        let fullLeaderBoardBtnText = "Full Leaderboards";
        let fLeaderBoardBtnText = "Female Leaderboards";
        let mLeaderBoardTbnText = "Male Leaderboards";
        
        return (
            <div>
                <div className="center">
                    <h1>Season { seasonId } Leaderboards</h1>
                </div>
                <div className="center">
                    <button className="btn btn-secondary" onClick={ (e) => this.state.sexFilter = "" }>{ fullLeaderBoardBtnText }</button>
                    <span> | </span>
                    <button className="btn btn-secondary" onClick={ (e) => this.state.sexFilter = "F" }>{ fLeaderBoardBtnText }</button>
                    <span> | </span>
                    <button className="btn btn-secondary" onClick={ (e) => this.state.sexFilter = "M" }>{ mLeaderBoardTbnText }</button>
                </div>
                <div className="container">
                    <div className="mt-3 row justify-content-center">
                    <table id='players'>
                        { this.showTable(this.state.sexFilter) }
                    </table>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default RecordsComponents
