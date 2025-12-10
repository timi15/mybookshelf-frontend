import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/auth/Auth";
import axios from "axios";
import {BASE_URL} from "../config/api";
import {ReadingStatsChart} from "../component/dashboard/ReadingStatsChart";
import {GenreDonutChart} from "../component/dashboard/GenreDonutChart";
import {TopGenresTable} from "../component/dashboard/TopGenresTable";
import {DashboardLayout} from "../component/dashboard/DashboardLayout";
import {TopBooks} from "../component/dashboard/TopBooks";
import {Skeleton} from "@mui/material";
import {LastReadBookCard} from "../component/dashboard/LastReadBookCard";

export const Dashboard = () => {

    const {idToken} = useContext(AuthContext);

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        axios
            .get(`${BASE_URL}/v1/mybookshelf/dashboard/${currentYear}`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })
            .then(res => {
                setDashboard(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [idToken]);

    const loadingSkeleton = {
        readBookNumber: <Skeleton variant="text" width={60} height={40}/>,
        lovedBookNumber: <Skeleton variant="text" width={60} height={40}/>,
        lastReadBook: <Skeleton variant="rectangular" width={120} height={180}/>,
        topBooks: <Skeleton variant="rectangular" width="100%" height={220}/>,
        readingChart: <Skeleton variant="rectangular" width="100%" height={300}/>,
        genreDonut: <Skeleton variant="circular" width={160} height={160}/>,
        top3GenresTable: <Skeleton variant="rectangular" width="100%" height={200}/>
    };

    const realContent = {
        readBookNumber: dashboard?.totalBooks ?? 0,
        lovedBookNumber: dashboard?.totalLovedBooks ?? 0,
        lastReadBook: <LastReadBookCard image={dashboard?.lastReadBookImage ?? null}/>,
        topBooks: <TopBooks dashboard={dashboard}/>,
        readingChart: <ReadingStatsChart dashboard={dashboard}/>,
        genreDonut: <GenreDonutChart dashboard={dashboard}/>,
        top3GenresTable: <TopGenresTable dashboard={dashboard}/>
    };

    return (
        <DashboardLayout
            {...(loading ? loadingSkeleton : realContent)}
        />
    )
}
