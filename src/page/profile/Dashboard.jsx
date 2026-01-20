import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/auth/Auth";
import axios from "axios";
import {BASE_URL} from "../../config/api";
import {AnnualReadingStat} from "../../component/dashboard/AnnualReadingStat";
import {GenreStat} from "../../component/dashboard/GenreStat";
import {Top3GenreTable} from "../../component/dashboard/Top3GenreTable";
import {DashboardLayout} from "../../component/dashboard/DashboardLayout";
import {Top5Book} from "../../component/dashboard/Top5Book";
import {Skeleton} from "@mui/material";
import {LastReadBook} from "../../component/dashboard/LastReadBook";

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
        readBookNumber: dashboard?.numberOfReadBooks ?? 0,
        lovedBookNumber: dashboard?.numberOfFavouriteBooks ?? 0,
        lastReadBook: <LastReadBook image={dashboard?.lastReadBookCoverUrl ?? null}/>,
        topBooks: <Top5Book dashboard={dashboard}/>,
        readingChart: <AnnualReadingStat dashboard={dashboard}/>,
        genreDonut: <GenreStat dashboard={dashboard}/>,
        top3GenresTable: <Top3GenreTable dashboard={dashboard}/>
    };

    return (
        <DashboardLayout
            {...(loading ? loadingSkeleton : realContent)}
        />
    )
}
