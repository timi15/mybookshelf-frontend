import React, {useContext, useState} from 'react';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {
    Box, Button,
    TextField,
    Typography
} from "@mui/material";
import Link from '@mui/material/Link';
import {AuthContext} from "../context/auth/Auth";
import {auth} from "../config/firebaseConfig";
import {PasswordReset} from "../component/PasswordReset";
import {PasswordField} from "../component/PasswordField";
import GoogleIcon from "@mui/icons-material/Google";
import '../assert/css/auth.css'
import {IssueAlertContext} from "../context/IssueAlert";

export const Login = () => {

    const {signInWithEmail, signInWithGoogle} = useContext(AuthContext);
    const {showAlert} = useContext(IssueAlertContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleSubmitEmailAndPassword = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmail(formData.email, formData.password);
            setFormData({email: '', password: ''});
            showAlert('Login successfully', 'success');
            navigate("/home");

        } catch (error) {
            showAlert(error.message, 'error');
        }
    }

    const handleSubmitGoogle = async () => {
        try {
            await signInWithGoogle();
            if (auth.currentUser) {
                showAlert('Login successfully', 'success');
                navigate("/home");
            }
        } catch (error) {
            showAlert(error.message, 'error');
        }
    }

    return (
        <div className='box'>

            <Box
                className="form-login"
                component="form"
                onSubmit={handleSubmitEmailAndPassword}
                autoComplete="off">

                <Typography variant="h3">
                    Login
                </Typography>

                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    required
                    size="small"
                    value={formData.email}
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

                <PasswordField
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

                <div style={{textAlign: 'right'}}>
                    <Link
                        component="button"
                        variant="body2"
                        underline="hover"
                        onClick={handleOpen}
                        className="forgot-psw"
                        sx={{cursor: "pointer"}}
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    style={{backgroundColor: "#3a4943"}}
                >
                    Login
                </Button>

                <div className="link-container">
                    <RouterLink className="link" to="/sign-up" variant="body1">
                        Don't have an account? Sign Up!
                    </RouterLink>
                </div>

                <div className="divider">
                    <span>or</span>
                </div>

                <Button
                    size="large"
                    variant="contained"
                    onClick={handleSubmitGoogle}
                    style={{backgroundColor: "#3a4943"}}
                >
                    <GoogleIcon className="google-icon" fontSize="medium"/> Login with Google
                </Button>

            </Box>

            <PasswordReset open={open} handleClose={handleClose}/>

        </div>
    )
}
