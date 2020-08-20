import React, { PureComponent, Fragment } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class Charting extends PureComponent {

  render() {

    const {
        p1Goals,
        p2Goals
    } = this.props;

    
    let data = [
        {
          name: 'Goals', p1: p1Goals, p2: p2Goals, amt: 100,
        },
        {
          name: 'Assists', p1: 0, p2: 0, amt: 100,
        },
        {
          name: '2nd Assists', p1: 0, p2: 0, amt: 100,
        },
        {
          name: 'Ds', p1: 0, p2: 0, amt: 100,
        },
      ];


    return (
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="p1" fill="#82ca9d" />
            <Bar dataKey="p2" fill="#8884d8" />
        </BarChart>
    );
  }
}
