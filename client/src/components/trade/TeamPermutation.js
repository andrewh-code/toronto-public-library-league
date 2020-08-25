import React, { Component } from 'react'

//https://stackoverflow.com/questions/49171107/how-to-add-and-remove-table-rows-dynamically-in-react-js
//https://stackoverflow.com/questions/4632322/finding-all-possible-combinations-of-numbers-to-reach-a-given-sum
const MAX_PLAYERS = 3;

export default class TeamPermutation extends Component {
    
    constructor() {
        super();
        this.state = {
            salaryCap: 0,
            rows: [{
                name: '',
                salary: ''
            }]
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
        result = this.calculate(playerSalaries, cap, partial, []);
        console.log("final result is: ");
        console.log(result);
    }

    // recursion
    calculate(playerSalaries, cap, partial, result) {

        console.log("salaries is: ");
        console.log(playerSalaries);

        let partialSum = 0;
        if (Array.isArray(partial) && partial.length > 0){
            partialSum = partial.reduce((a,b) => { return a + b})
        }
        console.log("partial sum is: " + partialSum);

        if (partialSum <= cap) {
            console.log("partial: %s, partialsum: %s, salarycap: %s", partial.join("+"), partialSum, cap)
            
            result.push(partial);
            console.log(result);
            console.log("----------");
        }
        if (partialSum > cap){
            console.log("partial sum is too high: " + partialSum);
            console.log("----------");
            return;
        }

        let sum = 0;
        for (let i = 0; i < playerSalaries.length; i++) {
            let n = playerSalaries[i];
            let remaining = playerSalaries.slice(i+1);
            console.log("remaing values: ")
            console.log(remaining);
            partial = partial.concat(n);
            console.log("new partial is: ")
            console.log(partial);
            console.log("calling function again...");
            

            this.calculate(remaining, cap, partial, result)
        }

        return result;
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
                <div className="row">
                    <div className="col-6">
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
                                            {/* <input
                                                type="text"
                                                name="player"
                                                onChange={ this.handleInputName(index) }
                                                value={ this.state.rows[index].player || '' }
                                                placeholder="enter player...">
                                            </input> */}
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
                            {/* { this.renderMaxLimitRow() } */}
                            
                        </table>
                    </div>
                    <div className="col-6">
                        <button onClick={ this.handleAddRow } className="btn btn-secondary">Add Player</button>
                        <button onClick= {this.handleRemoveRow } className="btn btn-secondary">Remove Player</button>
                        <button onClick= {this.calculatePermutation } className="btn btn-secondary">Calculate</button>
                    </div>
                </div>
                <div className="row">
                </div>
            </div>
        )
    }
}