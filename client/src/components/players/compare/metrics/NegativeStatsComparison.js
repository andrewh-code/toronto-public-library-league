import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class NegativeStatsComparison extends PureComponent {

    render() {

        const {
            p1Name,
            p2Name,
            p1TA,
            p2TA,
            p1RE,
            p2RE
        } = this.props;


        let data = [
            {
                name: 'TA', p1: p1TA, p2: p2TA, amt: 100,
            },
            {
                name: 'RE', p1: p1RE, p2: p2RE, amt: 100,
            }
        ];

        console.log(p1TA);
        console.log(p2TA);
        return (
            <BarChart
                width={500}
                height={500}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]} type="number"/>
                <Tooltip />
                <Legend />
                <Bar name={ p1Name } dataKey="p1" fill="#82ca9d" />
                <Bar name={ p2Name } dataKey="p2" fill="#8884d8" />
            </BarChart>
        );
    }
}
