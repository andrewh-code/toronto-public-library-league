import React, { Component } from 'react'
import '../../css/PlayerProfile.css';
import '../../css/App.css';
import axios from 'axios';

export default class PlayerProfile extends Component {
    
    componentDidMount() {
        const seasonId = this.props.seasonId;
        let host = "http://localhost:1234";
        let baseEndpoint = "/players/individual/id/";
        let playerId = this.props.match.params.zid;
        let endpoint = host + baseEndpoint + playerId;

        axios.get(endpoint).then(response => {
            const serverResponseData = response.data;
            const status = response.data.status;
            const code = response.data.code;
            const id = response.data.id;
            const playerInfo = response.data.result;
            this.setState({
                mockPlayer: playerInfo
            })
        })
    }

    state = {
        playerId: this.props.playerId,
        mockPlayer: {
            name: "",
            sex: "",
            zuluruId: 0,
            picture: "",
            stats: [
                {
                    assistThrowawayRatio: "3.00",
                    assists: "46",
                    dTurnoverRatio: "0.85",
                    ds: "22",
                    goals: "49",
                    receiverError: "3",
                    salary: "$707,000",
                    secondAssists: "23",
                    secondAssits: null,
                    throwaways: "23",
                    timesTraded: "2",
                    wins: "8.5",
                    seasonId: 10,
                    season: "season 10 name"
                },
                {
                    assistThrowawayRatio: "3.3",
                    assists: "45",
                    dTurnoverRatio: "0.1",
                    ds: "2",
                    goals: "41",
                    receiverError: "3",
                    salary: "$307,000",
                    secondAssists: "2",
                    secondAssits: null,
                    throwaways: "18",
                    timesTraded: "5",
                    wins: "8.5",
                    seasonId: 9,
                    season: "season 9 name"
                }
            ]
        }
    }

    renderTableHeader() {
        let individualPlayerTableHeader = [
            "Season",
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
        return individualPlayerTableHeader.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    };

    renderMostRecentSeasonTableData() {
        const { name, sex } = this.state.mockPlayer;

        let mostRecentSeason = this.state.mockPlayer.stats.reduce((prevElement, currentElement) => {
            return (prevElement.seasonId > currentElement.seasonId) ? prevElement : currentElement
        });
        const {
            assistThrowawayRatio,
            assists,
            dTurnoverRatio,
            ds,
            goals,
            receiverError,
            salary,
            seasonName,
            secondAssists,
            throwaways,
            timesTraded,
            wins,
            seasonId
        } = mostRecentSeason;
        
        return (
            <tr>
                <td>{seasonId} : {seasonName}</td>
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
    }

    renderHistoricalSeasonData() {
        const { name, sex } = this.state.mockPlayer;
        let mockPlayerStats = this.state.mockPlayer.stats;
        
        return mockPlayerStats.map((stat, index) => {
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
                wins,
                seasonName,
                seasonId
            } = stat;
           
            return (
                <tr key={index}>
                    <td>{seasonId} : {seasonName}</td>
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
        });
    }

    renderCareerTotalsData() {
        const mockPlayerStats = this.state.mockPlayer.stats;

        let avgAssistThrowawayRatio = 0;
        let sumAssists = 0;
        let avgDTurnoverRatio = 0;
        let sumDs = 0;
        let sumGoals = 0;
        let sumReceiverError = 0;
        let sumSalary = 0;
        let sumSecondAssists = 0;
        let sumThrowaways = 0;
        let sumTimesTraded = 0;
        let sumWins = 0;
        
        let i;
        let newSumValue;
        for (i = 0; i < mockPlayerStats.length; i++){
            avgAssistThrowawayRatio += parseInt(mockPlayerStats[i].assistThrowawayRatio);
            sumAssists += parseInt(mockPlayerStats[i].assists);
            avgDTurnoverRatio += parseFloat(mockPlayerStats[i].dTurnoverRatio);
            sumDs += parseInt(mockPlayerStats[i].ds);
            sumGoals += parseInt(mockPlayerStats[i].goals);
            sumReceiverError += parseInt(mockPlayerStats[i].receiverError);
            newSumValue = mockPlayerStats[i].salary.replace(/[^0-9]/g, "");
            sumSalary += parseFloat(newSumValue);
            sumSecondAssists += parseInt(mockPlayerStats[i].secondAssists);
            sumThrowaways += parseInt(mockPlayerStats[i].throwaways);
            sumTimesTraded += parseInt(mockPlayerStats[i].timesTraded);
            sumWins += parseInt(mockPlayerStats[i].wins);
        }
        // convert to currency
        sumSalary = "$" + sumSalary.toLocaleString();
        avgAssistThrowawayRatio = avgAssistThrowawayRatio / mockPlayerStats.length;
        avgDTurnoverRatio = avgDTurnoverRatio / mockPlayerStats.length;

        return (
            <tr id="career_totals">
                <td>Career Totals</td>
                <td>{sumSalary}</td>
                <td>{sumGoals}</td>
                <td>{sumAssists}</td>
                <td>{sumSecondAssists}</td>
                <td>{sumDs}</td>
                <td>{sumThrowaways}</td>
                <td>{sumReceiverError}</td>
                <td>{avgAssistThrowawayRatio.toFixed(2)}</td>
                <td>{avgDTurnoverRatio.toFixed(2)}</td>
                <td>{sumTimesTraded}</td>
                <td>{sumWins}</td>
            </tr>
        )
    }

    render() {

        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <img src = {this.state.mockPlayer.picture} alt="player_profile_pic" id="player_avatar"></img>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm border-bottom">
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div>
                            <h3>{this.state.mockPlayer.name}</h3>
                            <div align="center">
                                <p>Height: 6'0</p>
                                <p>Weight: 200 lb</p>
                                <p>Birthdate: 01/31/2000</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h4>Player Bio</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                    <div className="row">
                        <h4>Most Recent Season Stats: {this.state.seasonId} </h4>
                    </div>
                    <div className="row">
                        <table id="players">
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderMostRecentSeasonTableData()}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <h4>Career Stats</h4>
                    </div>
                    <div className="row">
                        <table id="players">
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderHistoricalSeasonData()}
                                {this.renderCareerTotalsData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
