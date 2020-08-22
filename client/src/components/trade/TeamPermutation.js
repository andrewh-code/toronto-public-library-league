import React, { Component } from 'react'

//https://stackoverflow.com/questions/49171107/how-to-add-and-remove-table-rows-dynamically-in-react-js
const MAX_PLAYERS = 13;

export default class TeamPermutation extends Component {
    
    constructor() {
        super();
        this.state = {
            rows: [{}]
        };

    }

    // add row
    handleAddRow = () => {
        const row = {
            name: "",
            salary: ""
        };

        if (this.state.rows.length <= MAX_PLAYERS) {
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
        const { name, salary } = e.target;
        const rows = [...this.state.rows];

        rows[index] = {
            [name]: salary
        };
        console.log(index);

        this.setState({
            rows
        });
    };

    renderRows() {
        let rows = this.state.rows;
    }

    render() {
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
                                        <td>{ index }</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={ this.handleInputRow(index) }
                                                value={ this.state.rows[index].name }
                                                placeholder="enter player...">
                                            </input>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="salary"
                                                onChange={ this.handleInputRow(index) }
                                                value={ this.state.rows[index].salary }
                                                placeholder="enter salary...">
                                            </input>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6">

                    </div>
                </div>
                <div className="row">
                    <div className="col-6 border">
                            <button onClick={ this.handleAddRow } className="btn btn-secondary">Add Player</button>
                            <button onClick= {this.handleRemoveRow } className="btn btn-secondary">Remove Player</button>
                    </div>
                </div>
            </div>
        )
    }
}


