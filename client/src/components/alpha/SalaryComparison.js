import React, { PureComponent, Fragment } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



export default class SalaryComparison extends PureComponent {
    
    render() {
        
        const {
            p1Salary,
            p2Salary
        } = this.props;

        let p1 = {};
        let p2 = {};

        p1.salary = p1Salary;
        p2.salary = p2Salary;

        let dataSalary = [
            {
              name: 'Salary', p1: p1.salary, p2: p2.salary, amt: 100000,
            }
          ];

        return (
            <Fragment>
                <BarChart
                    layout="vertical"
                    width={500}
                    height={300}
                    data={dataSalary}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                     <XAxis type="number" />
                    <YAxis type="category" dataKey="name"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="p1" fill="#82ca9d" />
                    <Bar dataKey="p2" fill="#8884d8" />
                </BarChart>
        </Fragment>
        );
    }
}
