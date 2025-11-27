import React, {useContext, useState} from 'react';
import {
    Box, Button,
    TextField,
    Typography
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Link from '@mui/material/Link';
import {PasswordReset} from "../component/PasswordReset";
import {PasswordField} from "../component/PasswordField";
import {auth} from "../firebaseConfig";
import {AuthContext} from "../context/auth/Auth";
import '../assert/auth.css'

export const Login = () => {

    const {signInWithEmail, signInWithGoogle} = useContext(AuthContext);
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
            navigate("/home");
        } catch (error) {
            console.error("Sign up error:", error.code, error.message);
        }
    }

    const handleSubmitGoogle = async () => {
        try {
            await signInWithGoogle();
            if (auth.currentUser) navigate("/home");
        } catch (error) {
            console.error("Google sign up error:", error);
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
                    size="small"
                    id="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    type="email"
                    variant="outlined"
                    required
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
                        sx={{ cursor: "pointer" }}
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    size="large"
                    variant="contained"
                    type="submit"
                    style={{backgroundColor: "#3a4943"}}
                >
                    Login
                </Button>

                <div className="link-container">
                    <RouterLink className="link" to="/sign-up"
                          variant="body1">
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
