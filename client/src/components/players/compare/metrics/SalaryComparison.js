import React, { PureComponent, Fragment } from 'react';

export default class SalaryComparison extends PureComponent {

    render() {
        const fontSize = 250;
        const {
            p1Name,
            p2Name,
            p1Salary,
            p2Salary
        } = this.props;

        let p1SalaryCurr = "$" + p1Salary.toLocaleString();
        let p2SalaryCurr = "$" + p2Salary.toLocaleString();
        let ratio = parseInt(p1Salary/p2Salary);
        let p1SalaryPercentage = 1 + parseFloat(parseFloat(p1Salary)/(parseFloat(p1Salary) + parseFloat(p2Salary)));        

        let p1CssSize;
        let p2CssSize;
        let compareSize = fontSize + "%";
        let comparator;

        if (ratio > 1.00) {
            comparator = ">";
            p1CssSize = parseInt(fontSize * p1SalaryPercentage) + "%";
            p2CssSize = fontSize + "%";
        } else if (ratio < 1.00) {
            comparator = "<";
            p2CssSize = parseInt(fontSize * p1SalaryPercentage) + "%";
            p1CssSize = fontSize + "%";
        } else {
            comparator = "=";
            p1CssSize = parseInt(fontSize * p1SalaryPercentage) + "%";
            p2CssSize = parseInt(fontSize * p1SalaryPercentage) + "%";
        }

        // #82ca9d --> green (p1)
        // #8884d8 --> purple (p2)
        let p1SalaryStyle = {
            fontWeight: 'bold',
            color: '#82ca9d',
            fontSize: p1CssSize
        }
        let comparatorSalaryStyle = {
            fontWeight: 'bold',
            fontSize: compareSize
        }
        let p2SalaryStyle = {
            fontWeight: 'bold',
            color: '#8884d8',
            fontSize: p2CssSize
        }
        
        let p1BoxStyle = {
            width: '15px',
            height: '10px',
            backgroundColor: '#82ca9d'
        }
        let p2BoxStyle = {
            width: '15px',
            height: '10px',
            backgroundColor: '#8884d8'
        }
        
        return (
            <Fragment>
                <div align="center">
                    <p id="p1Salary" style={ p1SalaryStyle }>{ p1SalaryCurr }</p>
                    <p id="comparatorSalary" style={ comparatorSalaryStyle }>{ comparator }</p>
                    <p id="p2Salary" style={ p2SalaryStyle }>{ p2SalaryCurr }</p>
                </div>
                <div align="center">
                    <div className="col">
                        <div id="box" style={ p1BoxStyle }></div><p>{ p1Name }</p>
                    </div>
                    <div className="col">
                        <div id="box" style={ p2BoxStyle }></div><p>{ p2Name }</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}
