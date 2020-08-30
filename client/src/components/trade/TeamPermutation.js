import React, { Component } from 'react'

//https://stackoverflow.com/questions/49171107/how-to-add-and-remove-table-rows-dynamically-in-react-js
//https://stackoverflow.com/questions/4632322/finding-all-possible-combinations-of-numbers-to-reach-a-given-sum
const MAX_PLAYERS = 5;

export default class TeamPermutation extends Component {
    
    constructor() {
        super();
        this.state = {
            salaryCap: 0,
            rows: [{
                name: '',
                salary: ''
            }],
            permutationResults: []
        };
    }

    // add row
    handleAddRow = () => {
        const row = {
            name: "",
            salary: ""
        };

        if (this.state.rows.length < MAX_PLAYERS) {
            this.setState({
                rows: [...this.state.rows, row]
            });
        }
    }

    handleRemoveRow = () => {
        if (this.state.rows.length > 1) {
            this.setState({
                rows: this.state.rows.slice(0,-1)
            })
        }
    }

    handleInputRow = index => e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];

        rows[index] = {
            [name]: value
        };
        this.setState({
            rows
        });
    }

    handleInputSetSalaryCap = e => {
            this.setState({
            salaryCap: e.target.value
        })
    }

    renderMaxLimitRow() {
        let rows = this.state.rows;
        if (rows.length === MAX_PLAYERS) {
            return (
                <tr>
                    <td>Max Reached</td>
                    <td>Enter Salary Cap</td>
                    <td>
                        <input 
                            type="text"
                            name="salaryCap"
                            onChange={ this.handleInputSetSalaryCap() }
                            value={ this.state.salaryCap }
                            placeholder="enter salary cap..."
                            />
                    </td>
                </tr>
                
            )
        }
    }

    calculatePermutation = () => {
        let cap = this.state.salaryCap;
        let rows = this.state.rows;
        
        let playerSalaries = []
        for (let i = 0; i < rows.length; i++) {
            let salary = parseInt(rows[i].salary);
            // do a check for negative/decimal, etc
            playerSalaries.push(salary);
        }
        let partial = [];
        let result = []; 
        result = this.subsetSum([],playerSalaries, cap, partial);
        console.log("final result is: ");
        console.log(result);

        this.setState({
            permutationResults: result
        })
    }

    subsetSum(output, playerSalaries, cap, partial) {
        var s, n, remaining;

        partial = partial || [[],[]];

        // sum partial
        var s = 0;
        // if (Array.isArray(partial) && partial.length > 0) {
        //     s = partial.reduce(function (a, b) {
        //         return a[1] + b[1];
        //     }, 0);
        // }    filter doesn't work for some readon
        for (let j = 0; j < partial.length; j++){
            s += partial[j][1];
        }

        // check if the partial sum is equals to target
        if (s <= cap) {
            console.log("%s=%s", partial.join("+"), cap);
            output.push(partial);
        }

        if (s >= cap) {
            return;  // if we reach the number why bother to continue
        }

        for (var i = 0; i < playerSalaries.length; i++) {
            let n = playerSalaries[i];
            let remaining = playerSalaries.slice(i + 1);
            // this.subsetSum(output, remaining, cap, partial.concat([n]));
            let tempArray = [[i,n]];
            this.subsetSum(output, remaining, cap, partial.concat(tempArray));
        }

        return output;
    }

    render() {

        let max = MAX_PLAYERS;
        let reachedMax = this.state.rows.length === MAX_PLAYERS;

        let calculateBtn;
        if (reachedMax) {
            calculateBtn = <button onClick= {this.calculatePermutation } className="btn btn-secondary">Calculate</button>
        }
        
        return (
            
            <div className="container">
                <h1 id="page_title">Salary Cap Trade Helper</h1>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                        <div className="col-6">
                            <button id="remove_player" onClick= {this.handleRemoveRow } className="btn btn-secondary btn-block">Remove Player</button>        
                        </div>
                        <div className="col-6">
                            <button id="add_player" onClick={ this.handleAddRow } className="btn btn-secondary btn-block">Add Player</button> 
                        </div>  
                        </div>
                                               
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Player</th> 
                                    <th>Salary</th> 
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.rows.map((row, index) => (
                                    <tr key={ index }>
                                        <td>{ index + 1}</td>
                                        <td>
                                            Player { index + 1}
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="salary"
                                                onChange={ this.handleInputRow(index) }
                                                value={ this.state.rows[index].salary || '' }
                                                placeholder="enter salary...">
                                            </input>
                                        </td>
                                    </tr>
                                ))}
                                {
                                reachedMax ? (
                                    <tr>
                                        <td>Max Reached</td>
                                        <td>Enter Salary Cap</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="salaryCap"
                                                onChange={this.handleInputSetSalaryCap}
                                                value={this.state.salaryCap}
                                                placeholder="enter salary cap..."
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    <tr></tr>
                                )
                            }
                            </tbody>
                        </table>
                        {
                            reachedMax ? (
                                <button id="calculate_trade" onClick= {this.calculatePermutation } className="btn btn-secondary btn-block">Calculate</button>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                </div>
                <div className="row">
                </div>
            </div>
        )
    }
}