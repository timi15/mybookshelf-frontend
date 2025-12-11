import React from 'react'
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {Box, Skeleton} from "@mui/material";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const Top3GenreTable = ({dashboard}) => {

    const top3Genres = dashboard?.top3Genres ?? [];

    const rows = top3Genres.map((genre, index) => ({
        rank: index + 1,
        genre,
    }));

    if (!top3Genres || top3Genres.length === 0) {
        return (
            <Box sx={{display: "flex", gap: 2, justifyContent: "center", }}>
                <Skeleton variant="rectangular" width="100%" height={130}/>
            </Box>
        );
    }

    return (
        <TableContainer  elevation={3} sx={{ width: "85%", marginLeft:"auto", marginRight:"auto" }}>
            <Table aria-label="top genres table">
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.rank}>
                            <StyledTableCell component="th" scope="row">
                                {row.rank}
                            </StyledTableCell>
                            <StyledTableCell>{row.genre}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
