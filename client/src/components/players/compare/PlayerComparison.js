import React, { Component, Fragment } from 'react'
import axios from 'axios'

export default class PlayerComparison extends Component {
    
    componentDidMount() {

    }


    constructor(){
        super();

        this.state = {
            player1Input: '',
            player2Input: '',

            player1SelectedSeason: null,
            player2SelectedSeason: null,
            player1: {
                name: "Test Player 2",
                zuluruId: 12345,
                stats: [
                    {
                        assistThrowawayRatio: "1.55",
                        assists: "24",
                        dTurnoverRatio: "0.11",
                        ds: "2",
                        goals: "41",
                        receiverError: "1",
                        salary: "$1,000,000",
                        secondAssists: "12",
                        throwaways: "13",
                        timesTraded: "4",
                        wins: "1",
                        seasonId: 10,
                        seasonName: "Rock Bands"
                    },
                    {
                        assistThrowawayRatio: "2.43",
                        assists: "24",
                        dTurnoverRatio: "0.13",
                        ds: "76",
                        goals: "61",
                        receiverError: "9",
                        salary: "$800,000",
                        secondAssists: "24",
                        throwaways: "36",
                        timesTraded: "5",
                        wins: "8",
                        seasonId: 8,
                        seasonName: "The 80s"
                    },
                    {
                        assistThrowawayRatio: "7",
                        assists: "7",
                        TurnoverRatio: "0.13",
                        ds: "7",
                        goals: "6",
                        receiverError: "9",
                        salary: "$700,000",
                        secondAssists: "14",
                        throwaways: "33",
                        timesTraded: "5",
                        wins: "7",
                        seasonId: 7,
                        seasonName: "Spy Movies"
                    }
                ],
                sex: "M",
                picture: "http://localhost:1234/img/male_default_pic.jpg"
            },
            player2: {
                name: "Test Player 1",
                zuluruId: 67890,
                stats: [
                    {
                        assistThrowawayRatio: "0.55",
                        assists: "34",
                        dTurnoverRatio: "1.11",
                        ds: "3",
                        goals: "31",
                        receiverError: "10",
                        salary: "$900,000",
                        secondAssists: "12",
                        throwaways: "16",
                        timesTraded: "2",
                        wins: "6",
                        seasonId: 10,
                        seasonName: "Rock Bands"
                    },
                    {
                        assistThrowawayRatio: "2.46",
                        assists: "15",
                        dTurnoverRatio: "2.13",
                        ds: "26",
                        goals: "61",
                        receiverError: "19",
                        salary: "$1,000,000",
                        secondAssists: "34",
                        throwaways: "16",
                        timesTraded: "1",
                        wins: "9",
                        seasonId: 8,
                        seasonName: "The 80s"
                    },
                    {
                        assistThrowawayRatio: "2",
                        assists: "1",
                        TurnoverRatio: "2.13",
                        ds: "17",
                        goals: "16",
                        receiverError: "12",
                        salary: "$100,000",
                        secondAssists: "4",
                        throwaways: "0",
                        timesTraded: "0",
                        wins: "7",
                        seasonId: 7,
                        seasonName: "Spy Movies"
                    }
                ],
                sex: "M",
                picture: "http://localhost:1234/img/male_default_pic.jpg"
            }
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
        this.setState({ player1Input: 12345 })
    }

    onChangePlayer2 = (e) => {
        this.setState({ player2Input: 12345 })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.player1Input === '' || this.state.player2Input === '') {
            // this.setAlert('Please enter something', 'light');
        } else {
            // this.retrievePlayers(this.state.player1Input, this.state.player2Input);
        }
    };

    /**
     * functions for change season
     * @param {}
     */
    onChangePlayer1SelectedSeason = (e) => {
        this.setState({ player1SelectedSeason: e.target.value })
    };

    onChangePlayer2SelectedSeason = (e) => {
        this.setState({ player2SelectedSeason: e.target.value })
    };

    setDropDownForPlayer(player) {
        let seasons = this.state.player1.stats;
        return seasons.map((season, index) => {
            const seasonId = season.seasonId;
            return (
                <option value = { seasonId }>Season: { seasonId }</option>
            )
        });
    }

    render() {
        
        let player1 = this.state.player1;
        let player2 = this.state.player2;
        let season = this.state.player1SelectedSeason;

        return (
            <div className="container">
                
                {/* Player search part  */}
                <div className="row">
                    <div className="col-6">
                        <form onSubmit = { this.onSubmit }>
                            <input type="text" value = { this.state.player1Input } onChange = { this.onChangePlayer1 } placeholder="player 1 ID..."></input>
                        </form>
                    </div>
                    <div className="col-6">
                        <form onSubmit = { this.onSubmit }>
                            <input type="text" value = { this.state.player2Input } onChange = { this.onChangePlayer2 } placeholder="player 2 ID..."></input>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <form onSubmit = { this.onSubmit }>
                                <input type="submit"
                                    value="Get Players"
                                    disabled = { !this.state.player1Input || !this.state.player2Input }
                                    className = "btn btn-secondary btn-block"/>
                            </form>
                    </div>
                </div>

                {/* display player profile */}
                <div className="row">
                    <div className="col">
                    <center>
                        <img src = { player1.picture } id="player_avatar"></img>
                        <p>{ player1.name }</p>
                        <select id = "dropdown" value = { this.player1SelectedSeason } onChange = { this.onChangePlayer1SelectedSeason }>
                            <option value="Select season...">Select Season...</option>
                            { this.setDropDownForPlayer(player1) }
                        </select>
                    </center>
                    </div>
                    <div className="col">
                    <center>
                        <img src = { player2.picture } id="player_avatar"></img>
                        <p>{ player2.name }</p>
                        <select id = "dropdown" value = { this.player1SelectedSeason } onChange = { this.onChangePlayer2SelectedSeason }>
                            <option value="Select season...">Select Season...</option>
                            { this.setDropDownForPlayer(player2) }
                        </select>
                    </center>
                    </div>
                </div>
                {/* combine stats button */}
                <div className="row">
                    <div className="col">
                        <form onSubmit = { this.onSubmit }>
                                <input type="submit"
                                    value="Compare Player Stats"
                                    disabled = { !this.state.player1SelectedSeason || !this.state.player2SelectedSeason }
                                    className = "btn btn-secondary btn-block"/>
                            </form>
                    </div>
                </div>
                {/* start displaying stats here */}
                <div className="row">
                    <div className="col border">
                        
                    </div>
                    <div className="col border">
                        
                    </div>
                </div>

            </div>
        )
    }
}
