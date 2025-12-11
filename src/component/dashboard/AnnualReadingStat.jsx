import React from 'react'
import {BarChart} from '@mui/x-charts/BarChart';

const MONTHS = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export const AnnualReadingStat = ({dashboard}) => {

    const monthlyStat = dashboard?.monthlyReadingStats ?? {};
    const monthlyDataset = MONTHS.map((month) => ({
        month,
        value: monthlyStat[month] ?? 0,
    }));

    return (
        <BarChart
            sx={{
                width: '80%',
                marginLeft: 'auto',
                marginRight: 'auto',
                '& .MuiBarLabel-root': {
                    fill: 'white'
                }
            }}
            dataset={monthlyDataset}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'month',
                    valueFormatter: (month) => month.slice(0, 3).toLowerCase(),
                    height: 40,

                },
            ]}
            series={[
                {
                    color: '#3a4943',
                    dataKey: 'value',
                    barLabel: (item) => item.value > 0 ? `${item.value}` : ''
                },
            ]}
            slots={{
                tooltip: () => null
            }}
            height={300}
            grid={{horizontal: true}}
            yAxis={[
                {
                    label: 'Number of books read',
                    width: 60,
                    tickInterval: 1
                }
            ]}
        />
    )
}
