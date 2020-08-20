import React, { PureComponent, Fragment } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class NegativeStatsComparison extends PureComponent {

    render() {

        const {
            p1TA,
            p2TA,
            p1RE,
            p2RE
        } = this.props;


        let data = [
            {
                name: 'Throwaways', p1: p1TA, p2: p2TA, amt: 100,
            },
            {
                name: 'Receiver Error', p1: p1RE, p2: p2RE, amt: 100,
            }
        ];

        console.log(p1TA);
        console.log(p2TA);
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
