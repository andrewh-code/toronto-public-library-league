import React, { Component, Fragment } from 'react'
import axios from 'axios'
import SalaryComparison from './metrics/SalaryComparison';
import PositiveStatsComparison from './metrics/PositiveStatsComparison';
import NegativeStatsComparison from './metrics/NegativeStatsComparison';
import CompletenessComparison from './metrics/CompletenessComparison';

export default class PlayerComparison extends Component {
    
    constructor(){
        super();

        this.state = {
            player1Input: '',
            player2Input: '',

            showPlayerComparison: false,
            player1SelectedSeasonStats: {},
            player2SelectedSeasonStats: {},
            player1SelectedSeason: null,
            player2SelectedSeason: null,

        //     player1: {
        //         name: "Test Player 1",
        //         zuluruId: 12345,
        //         stats: [
        //             {
        //                 assistThrowawayRatio: "1.55",
        //                 assists: "24",
        //                 dTurnoverRatio: "0.11",
        //                 ds: "2",
        //                 goals: "41",
        //                 receiverError: "1",
        //                 salary: "$1,000,000",
        //                 secondAssists: "12",
        //                 throwaways: "13",
        //                 timesTraded: "4",
        //                 wins: "1",
        //                 seasonId: 10,
        //                 seasonName: "Rock Bands"
        //             },
        //             {
        //                 assistThrowawayRatio: "2.43",
        //                 assists: "24",
        //                 dTurnoverRatio: "0.13",
        //                 ds: "76",
        //                 goals: "61",
        //                 receiverError: "9",
        //                 salary: "$600,000",
        //                 secondAssists: "24",
        //                 throwaways: "36",
        //                 timesTraded: "5",
        //                 wins: "8",
        //                 seasonId: 8,
        //                 seasonName: "The 80s"
        //             },
        //             {
        //                 assistThrowawayRatio: "7",
        //                 assists: "7",
        //                 TurnoverRatio: "0.13",
        //                 ds: "7",
        //                 goals: "6",
        //                 receiverError: "9",
        //                 salary: "$300,000",
        //                 secondAssists: "14",
        //                 throwaways: "13",
        //                 timesTraded: "5",
        //                 wins: "7",
        //                 seasonId: 7,
        //                 seasonName: "Spy Movies"
        //             }
        //         ],
        //         sex: "M",
        //         picture: "http://localhost:1234/img/male_default_pic.jpg"
        //     },
        //     player2: {
        //         name: "Test Player 2",
        //         zuluruId: 67890,
        //         stats: [
        //             {
        //                 assistThrowawayRatio: "0.55",
        //                 assists: "34",
        //                 dTurnoverRatio: "1.11",
        //                 ds: "3",
        //                 goals: "31",
        //                 receiverError: "10",
        //                 salary: "$900,000",
        //                 secondAssists: "12",
        //                 throwaways: "16",
        //                 timesTraded: "2",
        //                 wins: "6",
        //                 seasonId: 10,
        //                 seasonName: "Rock Bands"
        //             },
        //             {
        //                 assistThrowawayRatio: "2.46",
        //                 assists: "15",
        //                 dTurnoverRatio: "2.13",
        //                 ds: "26",
        //                 goals: "61",
        //                 receiverError: "19",
        //                 salary: "$1,000,000",
        //                 secondAssists: "34",
        //                 throwaways: "16",
        //                 timesTraded: "1",
        //                 wins: "9",
        //                 seasonId: 8,
        //                 seasonName: "The 80s"
        //             },
        //             {
        //                 assistThrowawayRatio: "2",
        //                 assists: "1",
        //                 TurnoverRatio: "2.13",
        //                 ds: "17",
        //                 goals: "16",
        //                 receiverError: "12",
        //                 salary: "$100,000",
        //                 secondAssists: "4",
        //                 throwaways: "0",
        //                 timesTraded: "0",
        //                 wins: "7",
        //                 seasonId: 7,
        //                 seasonName: "Spy Movies"
        //             }
        //         ],
        //         sex: "M",
        //         picture: "http://localhost:1234/img/male_default_pic.jpg"
        //     }
            player1: {},
            player2: {},
        }
        

    }


    retrievePlayers(player1Id, player2Id) {    
        let baseEndpoint = "/players/individual/id/";
        
        let endpoint = baseEndpoint + player1Id;
        axios.get(endpoint).then(response => {
            const serverResponseData = response.data;
            const status = response.data.status;
            const code = response.data.code;
            const id = response.data.id;
            const playerInfo = response.data.result;
            this.setState({
                player1: playerInfo
            });
        });

        endpoint = baseEndpoint + player2Id;
        axios.get(endpoint).then(response => {
            const serverResponseData = response.data;
            const status = response.data.status;
            const code = response.data.code;
            const id = response.data.id;
            const playerInfo = response.data.result;
            this.setState({
                player2: playerInfo
            });
        });
    }

    /** 
     * functions for search for player
     */
    onChangePlayer1 = (e) => {
        // this.setState({ player1Input: 12345 })
        this.setState({ player1Input: e.target.value })
    }

    onChangePlayer2 = (e) => {
        // this.setState({ player2Input: 12345 })
        this.setState({ player2Input: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.player1Input === '' || this.state.player2Input === '') {
        } else {
            this.retrievePlayers(this.state.player1Input, this.state.player2Input);
        }
    };

    /**
     * functions for change
     * @param {}
     */
    onChangePlayer1SelectedSeason = (e) => {
        this.setState({ player1SelectedSeason: e.target.value })
    };

    onChangePlayer2SelectedSeason = (e) => {
        this.setState({ player2SelectedSeason: e.target.value })
    };

    setDropDownForPlayer(player) {
        // let seasons = this.state.player1.stats;
        if (player.stats) {
            let seasons = player.stats;
            return seasons.map((season, index) => {
            const seasonId = season.seasonId;
            return (
                <option key = { index } value = { seasonId }>Season: { seasonId }</option>
            )
        });
        }
    }

    onSubmitComparePlayers = (e) => {

        const {
            player1,
            player2,
            player1SelectedSeason,
            player2SelectedSeason,
        } = this.state;
        
        let p1Stats = {
            salary: 0,
            goals: 0,
            assists: 0,
            secondAssists: 0,
            ds: 0,
            throwaways: 0,
            receiverError: 0
        }

        let p2Stats = {
            salary: 0,
            goals: 0,
            assists: 0,
            secondAssists: 0,
            ds: 0,
            throwaways: 0,
            receiverError: 0
        }

        player1.stats.map((stat, index) => {
            if (stat.seasonId == player1SelectedSeason) {
                p1Stats.salary = stat.salary;                
                p1Stats.goals = stat.goals;
                p1Stats.assists = stat.assists;
                p1Stats.secondAssists = stat.secondAssists;
                p1Stats.ds = stat.ds;
                p1Stats.throwaways = stat.throwaways;
                p1Stats.receiverError = stat.receiverError;
            }
        });
        
        player2.stats.map((stat, index) => {
            if (stat.seasonId == player2SelectedSeason) {
                p2Stats.salary = stat.salary;                
                p2Stats.goals = stat.goals;
                p2Stats.assists = stat.assists;
                p2Stats.secondAssists = stat.secondAssists;
                p2Stats.ds = stat.ds;
                p2Stats.throwaways = stat.throwaways;
                p2Stats.receiverError = stat.receiverError;
            }
        });
       
        this.setState({
            showPlayerComparison: true,
            player1SelectedSeasonStats: p1Stats,
            player2SelectedSeasonStats: p2Stats
        })

    }

    showSalaryComparison() {
        let p1 = this.state.player1SelectedSeasonStats.salary;
        let p2 = this.state.player2SelectedSeasonStats.salary;
        let p1Name = this.state.player1.name;
        let p2Name = this.state.player2.name;
        let show = this.state.showPlayerComparison;
        
        p1 = String(p1).replace(/\$|,/g, "");
        p2 = String(p2).replace(/\$|,/g, "");

        if (p1 && p2 && show) {
            return (
                <Fragment>
                    <h4>Salary</h4>
                    <SalaryComparison p1Name = { p1Name } p2Name = { p2Name } p1Salary = { p1 } p2Salary = { p2 }/>
                </Fragment>
            );
        }
    }

    showPositiveStatsComparison() {
        let p1Name = this.state.player1.name;
        let p2Name = this.state.player2.name;
        let p1 = this.state.player1SelectedSeasonStats;
        let p2 = this.state.player2SelectedSeasonStats;
        let show = this.state.showPlayerComparison;

        if (p1 && p2 && show) {
            return (
                <Fragment>
                    <h4>Goals, Assists, 2nd Assists, Ds</h4>
                    <PositiveStatsComparison 
                        p1Name = { p1Name }
                        p2Name = { p2Name }
                        p1Goals = { p1.goals } 
                        p2Goals = { p2.goals }
                        p1Assists = { p1.assists }
                        p2Assists = { p2.assists }
                        p1SecondAssists = { p1.secondAssists }
                        p2SecondAssists = { p2.secondAssists }
                        p1Ds = { p1.ds }
                        p2Ds = { p2.ds }
                    />
                </Fragment>
            );
        }
    }

    showNegativeStatsComparison() {
        let p1Name = this.state.player1.name;
        let p2Name = this.state.player2.name;
        let p1 = this.state.player1SelectedSeasonStats;
        let p2 = this.state.player2SelectedSeasonStats;
        let show = this.state.showPlayerComparison;

        if (p1 && p2 && show) {
            return (
                <Fragment>
                    <h4>Throwaways, Receiver Errors</h4>
                    <NegativeStatsComparison 
                        p1Name = { p1Name }
                        p2Name = { p2Name }
                        p1TA = { p1.throwaways } 
                        p2TA = { p2.throwaways }
                        p1RE = { p1.receiverError }
                        p2RE = { p2.receiverError }
                    />
                </Fragment>
            );
        }
    }

    showCompletenessdComparison() {
        let p1Name = this.state.player1.name;
        let p2Name = this.state.player2.name;
        let p1 = this.state.player1SelectedSeasonStats;
        let p2 = this.state.player2SelectedSeasonStats;
        let show = this.state.showPlayerComparison;

        if (p1 && p2 && show) {
            return (
                <Fragment>
                    <h4>Overall Comparison</h4>
                    <CompletenessComparison 
                        p1Name = { p1Name }
                        p2Name = { p2Name }
                        p1 = { p1 } 
                        p2 = { p2 }
                    />
                </Fragment>
            );
        }
    }


    render() {
        
        let player1 = this.state.player1;
        let player2 = this.state.player2;
        let season = this.state.player1SelectedSeason;

        // player name place holder
        let placeHolder1 = !player1.name ? (<p style={{fontWeight: 'bold', color: '#82ca9d'}}>Player 1</p>) : (<p style={{fontWeight: 'bold', color: '#82ca9d'}}> { player1.name }</p>);
        let placeHolder2 = !player2.name ? (<p style={{fontWeight: 'bold', color: '#8884d8'}}>Player 2</p>) : (<p style={{fontWeight: 'bold', color: '#8884d8'}}> { player2.name }</p>);
        
        return (
            <div className="container">
                <div className="row mb-3">
                    <div className="col">
                        <h3>To compare, input the IDs of two players</h3>
                    </div>
                    
                </div>
                {/* Player search part  */}
                <div className="row mb-3">
                    <div className="col-4">
                        <form onSubmit = { this.onSubmit }>
                            <input type="text" value = { this.state.player1Input } onChange = { this.onChangePlayer1 } placeholder="player 1 ID..."></input>
                        </form>
                    </div>
                    <div className="col-4">
                        <form onSubmit = { this.onSubmit }>
                            <input type="text" value = { this.state.player2Input } onChange = { this.onChangePlayer2 } placeholder="player 2 ID..."></input>
                        </form>
                    </div>
                    <div className="col-4">
                        <form onSubmit = { this.onSubmit }>
                                <input type="submit"
                                    value="Get Players"
                                    disabled = { !this.state.player1Input || !this.state.player2Input }
                                    className = "btn btn-secondary btn-block"/>
                            </form>
                    </div>
                </div>
                <div className="row mb-3">
                </div>

                {/* display player profile */}
                <div className="row mb-3">
                    <div className="col">
                    <center>
                        <img src = { player1.picture } id="player_avatar"></img>
                        { placeHolder1 }
                        <select id = "dropdown" value = { this.player1SelectedSeason } onChange = { this.onChangePlayer1SelectedSeason } style={{ width: "50%"}}>
                            <option value="Select season...">Select Season...</option>
                            { this.setDropDownForPlayer(player1) }
                        </select>
                    </center>
                    </div>
                    <div className="col">
                    <center>
                        <img src = { player2.picture } id="player_avatar"></img>
                        { placeHolder2 }
                        <select id = "dropdown" value = { this.player2SelectedSeason } onChange = { this.onChangePlayer2SelectedSeason } style={{ width: "50%"}}>
                            <option value="Select season...">Select Season...</option>
                            { this.setDropDownForPlayer(player2) }
                        </select>
                    </center>
                    </div>
                </div>
                {/* combine stats button */}
                <div className="row mb-3">
                    <div className="col"></div>
                    <div className="col-6">
                        <button 
                            disabled = { !this.state.player1SelectedSeason || !this.state.player2SelectedSeason }
                            className="btn btn-secondary btn-block" 
                            onClick={this.onSubmitComparePlayers}>Compare Players
                        </button>
                    </div>
                    <div className="col"></div>
                </div>
                {/* start displaying stats here */}
                <div className="row mb-4">
                    
                </div>
                <div className="row mb-4">
                    <div className="col">
                        { this.showSalaryComparison() }
                    </div>
                    <div className="col">
                        { this.showCompletenessdComparison() }
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        { this.showNegativeStatsComparison() }
                    </div>
                    <div className="col">
                    { this.showPositiveStatsComparison() }
                    </div>
                </div>

            </div>
        )
    }
}
