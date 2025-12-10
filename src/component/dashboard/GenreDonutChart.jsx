import React from 'react'
import {PieChart} from '@mui/x-charts/PieChart';
import {Box, Skeleton} from "@mui/material";

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
        return (
            <Box sx={{ flexGrow: 1, display:"flex", justifyContent:"center", alignItems:"center", mt:7, mb:4 }}>
                <Skeleton variant="circular" width={180} height={180}/>
            </Box>
        );
    }

    const data = Object.entries(genreStat).map(([label, value]) => ({
        label,
        value,
        color: GENRE_COLORS[label],
    }));

    const settings = {
        margin: {right: 5},
        width: 260,
        height: 260,
        hideLegend: false,
    };

    return (
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
    )
}
