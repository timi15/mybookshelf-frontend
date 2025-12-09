import React from 'react'
import {PieChart} from '@mui/x-charts/PieChart';

export const GENRE_COLORS = {
    'Fantasy': '#7B68EE',
    'Science Fiction': '#00C49F',
    'Dystopian': '#FF8042',
    'Post-apocalyptic': '#A52A2A',
    'Thriller': '#8A2BE2',
    'Mystery': '#DA70D6',
    'Horror': '#DC143C',
    'Crime': '#B22222',
    'Romance': '#FF69B4',
    'Historical Fiction': '#CD853F',
    'Adventure': '#1E90FF',
    'Young Adult': '#FFB6C1',
    'Non-fiction': '#2E8B57',
    'Children\'s Books': '#FFD700',
    'Cooking / Cookbooks': '#FFA500',
    'Health & Wellness': '#20B2AA',
    'Self-Help': '#3CB371',
    'Educational': '#6495ED',
    'Memoir': '#D2691E',
};

export const GenreDonutChart = ({dashboard}) => {

    const genreStat = dashboard?.genreStat ?? {};

    if (!Object.keys(genreStat).length) {
        return <p>No genre data available</p>;
    }

    const data = Object.entries(genreStat).map(([label, value]) => ({
        label,
        value,
        color: GENRE_COLORS[label] || '#888888', // fallback, ha új genre lesz
    }));

    const settings = {
        margin: {right: 5},
        width: 260,
        height: 260,
        hideLegend: false,
    };

    return (
        <>

            <h3>Genre stat</h3>

            <PieChart
                series={[
                    {
                        innerRadius: 60,
                        outerRadius: 110,
                        data: data,
                        arcLabel: (item) => item.value,
                    },
                ]}
                {...settings}
            />
        </>
    )
}
