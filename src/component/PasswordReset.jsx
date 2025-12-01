import React, {useContext, useState} from 'react';
import {Box, Button, Modal, TextField, Typography, Snackbar} from '@mui/material';
import {AuthContext} from "../context/auth/Auth";
import '../assert/css/password-reset-modal.css';

export const PasswordReset = ({open, handleClose}) => {

    const {passwordResetEmail} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const handleClick = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };


    const resetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await passwordResetEmail(email);
            setMessage('✅ Password reset email sent! Please check your inbox.');
            setEmail('');
        } catch (error) {
            console.error(error);
            setError('⚠️ ' + (error.message || 'Something went wrong.'));
        }
    };

    return (
        <>
            {message &&
                <Snackbar
                    open={openAlert}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                    message={message}
                />
            }

            {error &&
                <Snackbar
                    open={openAlert}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                    message={error}
                />
            }

            <Modal
                id="password-reset-modal"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    id="password-reset-form"
                    component="form"
                    onSubmit={resetPassword}
                >
                    <Typography variant="h4" align="center">
                        Forgot your password?
                    </Typography>

                    <Typography variant="h6" align="center">
                        Enter your email address and we’ll send you a reset link.
                    </Typography>

                    <TextField
                        id="reset-email"
                        label="Email"
                        name="reset-email"
                        value={email}
                        type="email"
                        variant="outlined"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />

                    <Button size="large" variant="contained" type="submit" fullWidth onClick={handleClick} style={{backgroundColor:'#3a4943'}}>
                        Email me
                    </Button>

                </Box>
            </Modal>
        </>
    );
};
