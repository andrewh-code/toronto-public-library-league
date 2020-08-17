import React, { Component } from 'react';
import axios from 'axios';

export default class CurrentSeasonLeadersComponent extends Component {
    
    componentDidMount() {
        let sort = "desc";
        let limit = "5";
        let sex = "M";
        let seasonId = 16;
        
        let salaryLeadersEndpoint = `/stats/leaders/salary?seasonId=${seasonId}&sex=${sex}&sort=${sort}&limit=${limit}`;
        let goalLeadersEndpoint = `/stats/leaders/goals?seasonId=${seasonId}&sex=${sex}&sort=${sort}&limit=${limit}`;
        let assistLeadersEndpoint = `/stats/leaders/assists?seasonId=${seasonId}&sex=${sex}&sort=${sort}&limit=${limit}`;
        let secondAssistLeadersEndpoint = `/stats/leaders/secondassists?seasonId=${seasonId}&sex=${sex}&sort=${sort}&limit=${limit}`;
        let dLeadersEndpoint = `/stats/leaders/ds?seasonId=${seasonId}&sex=${sex}&sort=${sort}&limit=${limit}`;
        let winLeadersEndpoint = `/stats/leaders/wins?seasonId=${seasonId}&sex=${sex}&sort=${sort}&limit=${limit}`;

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
                    // need to figure out why salary not converted to currency when it reaches front end
                    let salary = parseInt(leader.stats.salary);
                    salary = "$" + salary.toLocaleString();
                    return (
                        <tr key = {index}>
                            <td id="sl_rank">{index+1}</td>
                            <td id="sl_name">{name}</td>
                            <td id="sl_metric">{salary}</td>
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
