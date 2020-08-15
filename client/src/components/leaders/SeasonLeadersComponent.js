import React, { Component } from 'react';
import axios from 'axios';

export default class CurrentSeasonLeadersComponent extends Component {
    
    componentDidMount() {
        let sort = "desc";
        let limit = "5";
        let sex = "M";
        
        let salaryLeadersEndpoint = `http://localhost:1234/stats/leaders/salary?sex=${sex}&sort=${sort}&limit=${limit}`;
        let goalLeadersEndpoint = `http://localhost:1234/stats/leaders/goals?sex=${sex}&sort=${sort}&limit=${limit}`;
        let assistLeadersEndpoint = `http://localhost:1234/stats/leaders/assists?sex=${sex}&sort=${sort}&limit=${limit}`;
        let secondAssistLeadersEndpoint = `http://localhost:1234/stats/leaders/secondassists?sex=${sex}&sort=${sort}&limit=${limit}`;
        let dLeadersEndpoint = `http://localhost:1234/stats/leaders/ds?sex=${sex}&sort=${sort}&limit=${limit}`;
        let winLeadersEndpoint = `http://localhost:1234/stats/leaders/wins?sex=${sex}&sort=${sort}&limit=${limit}`;

        let reqSalaryLeaders = axios.get(salaryLeadersEndpoint);
        let reqGoalLeaders = axios.get(goalLeadersEndpoint);
        let reqAssistLeaders = axios.get(assistLeadersEndpoint);
        let reqSecondAssistLeaders = axios.get(secondAssistLeadersEndpoint);
        let reqDLeaders = axios.get(dLeadersEndpoint);
        let reqWinLeaders = axios.get(winLeadersEndpoint);
        // reqGoalLeaders, reqAssistLeaders, reqSecondAssistLeaders, reqDLeaders, reqWinLeaders
        axios.all([reqSalaryLeaders, reqGoalLeaders, reqAssistLeaders, reqSecondAssistLeaders, reqDLeaders, reqWinLeaders])
            .then(axios.spread((...response) => {
                let salaryLeaders = response[0].data.result;
                let goalLeaders = response[1].data.result;
                let assistLeaders = response[2].data.result;
                let secondAssistLeaders = response[3].data.result;
                let dLeaders = response[4].data.result;
                let winLeaders = response[5].data.result;

                this.setState({
                    response: response[0],
                    salaryLeaders: salaryLeaders,
                    goalLeaders: goalLeaders,
                    assistLeaders: assistLeaders,
                    secondAssistLeaders: secondAssistLeaders,
                    dLeaders: dLeaders,
                    winLeaders: winLeaders
                })
            })).catch(errors => {
                // error checking here
            })
        
    }


    state = {
        response: {},
        salaryLeaders: [],
        goalLeaders: [],
        assistLeaders: [],
        secondAssistLeaders: [],
        dLeaders: [],
        winLeaders: []
    }
    
    renderLeaderTableHeader(metric) {
        let individualPlayerTableHeader = [
            "Rank",
            "Name",
            metric
        ]
        // header.push(...statsHeader);    // spread operator
        return individualPlayerTableHeader.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    };

    renderSeasonLeaderData(metric) {
        const {
            salaryLeaders,
            goalLeaders,
            assistLeaders,
            secondAssistLeaders,
            dLeaders,
            winLeaders
        } = this.state

        switch(metric) {
            case 'Salary':
                return salaryLeaders.map((leader, index) => {
                    const name = leader.name;
                    let salary = leader.stats.salary;
                    // why is this not tranforming? It works in PlayerProfile.js
                    salary = "$" + salary.toLocaleString();
                    return (
                        <tr key = {index}>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>{salary}</td>
                        </tr>
                    )
                });
                break;
            case "Goals":
                return goalLeaders.map((leader, index) => {
                    const name = leader.name;
                    const goals = leader.stats.goals;

                    return (
                        <tr key = {index}>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>{goals}</td>
                        </tr>
                    )
                });
                break;
            case "Assists":
                return assistLeaders.map((leader, index) => {
                    const name = leader.name;
                    const assists = leader.stats.assists;

                    return (
                        <tr key = {index}>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>{assists}</td>
                        </tr>
                    )
                });
                break;
            case "Second Assists":
                return secondAssistLeaders.map((leader, index) => {
                    const name = leader.name;
                    const secondAssists = leader.stats.secondAssists;

                    return (
                        <tr key = {index}>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>{secondAssists}</td>
                        </tr>
                    )
                });
                break;
            case "Ds":
                return dLeaders.map((leader, index) => {
                    const name = leader.name;
                    const ds = leader.stats.ds;

                    return (
                        <tr key = {index}>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>{ds}</td>
                        </tr>
                    )
                });
                break;
            case "Wins":
                return winLeaders.map((leader, index) => {
                    const name = leader.name;
                    const wins = leader.stats.wins;

                    return (
                        <tr key = {index}>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>{wins}</td>
                        </tr>
                    )
                });
                break;
            default:
                return (
                    <tr key = {1}>
                        <td>null</td>
                        <td>null</td>
                        <td>null</td>
                    </tr>
                )
                
        }

    }

    render() {
        let salaryTitle = "Salary Leaders";
        let goalTitle = "Goal Leaders";
        let assistTitle = "Assist Leaders";
        let secondAssistTitle = "Second Assist Leaders";
        let dTitle = "Defensive Leaders";
        let winsTitle = "Win Leaders"
        return (
            <div className="container">
                <h3 className="center">Current Season Leaders</h3>
                <div className="row">
                    <div id="season_leaders" className="col-6">
                        <h5 id="season_leaders">{salaryTitle}</h5>
                        <table id="players">
                            <tbody>
                                <tr>{this.renderLeaderTableHeader("Salary")}</tr>
                                {this.renderSeasonLeaderData("Salary")}
                            </tbody>
                        </table>
                    </div>
                    <div id="season_leaders" className="col-6">
                        <h5 id="season_leaders">{goalTitle}</h5>
                        <table id="players">
                            <tbody>
                                <tr>{this.renderLeaderTableHeader("Goals")}</tr>
                                {this.renderSeasonLeaderData("Goals")}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div id="season_leaders" className="col-6">
                        <h5 id="season_leaders">{assistTitle}</h5>
                        <table id="players">
                            <tbody>
                                <tr>{this.renderLeaderTableHeader("Assists")}</tr>
                                {this.renderSeasonLeaderData("Assists")}
                            </tbody>
                        </table>
                    </div>
                    <div id="season_leaders" className="col-6">
                        <h5 id="season_leaders">{secondAssistTitle}</h5>
                        <table id="players">
                            <tbody>
                                <tr>{this.renderLeaderTableHeader("Second Assists")}</tr>
                                {this.renderSeasonLeaderData("Second Assists")}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div id="season_leaders" className="col-6">
                    <h5 id="season_leaders">{dTitle}</h5>
                        <table id="players">
                            <tbody>
                                <tr>{this.renderLeaderTableHeader("Ds")}</tr>
                                {this.renderSeasonLeaderData("Ds")}
                            </tbody>
                        </table>
                    </div>
                    <div id="season_leaders" className="col-6">
                        <h5 id="season_leaders">{winsTitle}</h5>
                        <table id="players">
                            <tbody>
                                <tr>{this.renderLeaderTableHeader("Wins")}</tr>
                                {this.renderSeasonLeaderData("Wins")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
