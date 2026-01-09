import React from 'react'
import {Box, TextField} from "@mui/material";

export const DateRangeFields = ({formData, setFormData}) => {

    const today = new Date().toISOString().split("T")[0];

    return (
        <Box sx={{display: "flex", gap: 2}}>
            <TextField
                id="startDate"
                name="startDate"
                label="Start Date"
                type="date"
                required
                fullWidth
                size="small"
                value={formData.startDate}
                InputLabelProps={{ shrink: true }}
                slotProps={{
                    input: {
                        inputProps: {
                            max: today
                        }
                    }
                }}
                onChange={({target}) =>
                    setFormData({...formData, [target.name]: target.value})
                }
            />

            <TextField
                id="finishDate"
                name="finishDate"
                label="Finish Date"
                type="date"
                required
                fullWidth
                size="small"
                value={formData.finishDate}
                InputLabelProps={{ shrink: true }}
                slotProps={{
                    input: {
                        inputProps: {
                            min: formData.startDate || "",
                            max: today
                        }
                    }
                }}
                onChange={({target}) =>
                    setFormData({...formData, [target.name]: target.value})
                }
            />
        </Box>
    )
}
