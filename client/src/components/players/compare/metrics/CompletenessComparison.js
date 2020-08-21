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

        let p1Goals = parseInt(p1.goals);
        let p2Goals = parseInt(p2.goals);
        let p1Assists = parseInt(p1.assists);
        let p2Assists = parseInt(p2.assists);
        let p1SecondAssists = parseInt(p1.secondAssists);
        let p2SecondAssists = parseInt(p2.secondAssists);
        let p1RE = parseInt(p1.receiverError);
        let p2RE = parseInt(p2.receiverError);
        let p1TA = parseInt(p1.throwaways);
        let p2TA = parseInt(p2.throwaways);
        let p1Ds = parseInt(p1.ds);
        let p2Ds = parseInt(p2.ds);

        let data = [
            { subject: 'Goals', A: p1Goals, B: p2Goals, fullMark: 150 },
            { subject: 'Assists', A: p1Assists, B: p2Assists, fullMark: 150 },
            { subject: '2nd Ass.', A: p1SecondAssists, B: p2SecondAssists, fullMark: 150 },
            { subject: 'Ds', A: p1Ds, B: p2Ds, fullMark: 150 },
            { subject: 'TA', A: p1TA, B: p2TA, fullMark: 150 },
            { subject: 'RE', A: p1RE, B: p2RE, fullMark: 150 },
        ];

        return (
            <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}/>
                <Radar name={ p1Name } dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name={ p2Name } dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend verticalAlign="top"/>
            </RadarChart>
        );
    }
}
