import React, { PureComponent } from 'react';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

export default class CompletenessComparison extends PureComponent {

    render() {

        const {
            p1Name,
            p2Name,
            p1,
            p2
        } = this.props;


        let data = [
            { subject: 'Goals', A: p1.goals, B: p2.goals, fullMark: 150 },
            { subject: 'Assists', A: p1.assists, B: p2.assists, fullMark: 150 },
            { subject: '2nd Ass.', A: p1.secondAssists, B: p2.secondAssists, fullMark: 150 },
            { subject: 'Ds', A: p2.ds, B: p2.ds, fullMark: 150 },
            { subject: 'TA', A: p1.throwaways, B: p2.throwaways, fullMark: 150 },
            { subject: 'RE', A: p2.receiverError, B: p2.receiverError, fullMark: 150 },
        ];

        return (
            <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]} type="number"/>
                <Radar name={ p1Name } dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name={ p2Name } dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend verticalAlign="top"/>
            </RadarChart>
        );
    }
}
