import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const genres = [
    'Fantasy',
    'Science Fiction',
    'Dystopian',
    'Post-apocalyptic',
    'Thriller',
    'Mystery',
    'Horror',
    'Crime',
    'Romance',
    'Historical Fiction',
    'Adventure',
    'Young Adult',
    'Non-fiction',
    'Children\'s Books',
    'Cooking / Cookbooks',
    'Health & Wellness',
    'Self-Help',
    'Educational',
    'Memoir',
];

function getStyles(genre, selectedGenres, theme) {
    return {
        fontWeight: selectedGenres.includes(genre)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export const GenreSelect = ({ value, onChange }) => {

    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };


    return (
        <div>
            <FormControl required sx={{width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Genre</InputLabel>
                <Select

                    fullWidth
                    variant="outlined"
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                 >
                    {genres.map((genre) => (
                        <MenuItem
                            key={genre}
                            value={genre}
                            style={getStyles(genre, value, theme)}
                        >
                            {genre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
