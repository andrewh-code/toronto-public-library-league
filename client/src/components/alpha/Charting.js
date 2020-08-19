import React, { PureComponent, Fragment } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const dataSalary = [
  {
    name: 'Salary', p1: 900000, p2: 750000, amt: 100000,
  }
];

const data = [
    {
      name: 'Goals', p1: 100, p2: 43, amt: 200,
    },
    {
      name: 'Assists', p1: 24, p2: 63, amt: 2210,
    },
    {
      name: 'Second Assists', p1: 54, p2: 10, amt: 2290,
    },
    {
      name: 'Ds', p1: 9, p2: 8, amt: 2000,
    },
  ];

export default class Charting extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
        <Fragment>
      <BarChart
        width={500}
        height={300}
        data={dataSalary}
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
      </Fragment>
    );
  }
}
