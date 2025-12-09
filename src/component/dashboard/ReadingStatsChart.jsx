import React from 'react'
import {BarChart} from '@mui/x-charts/BarChart';

const MONTHS = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export const ReadingStatsChart = ({dashboard}) => {

    const monthlyStat = dashboard?.monthlyStat ?? {};
    const monthlyDataset = MONTHS.map((month) => ({
        month,
        value: monthlyStat[month] ?? 0,
    }));

    return (
        <BarChart
            sx={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}
            dataset={monthlyDataset}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'month',
                    valueFormatter: (month) => month.slice(0, 3),
                    height: 40,

                },
            ]}
            series={[
                {
                    dataKey: 'value',
                    label: 'Books read',
                    valueFormatter: (v) => `${v} book(s)`,
                },
            ]}
            height={300}
            grid={{horizontal: true}}
            yAxis={[
                {
                    label: 'Books read',
                    width: 60,
                    tickInterval: 1
                }
            ]}
        />
    )
}
