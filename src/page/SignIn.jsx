import React, {useContext, useState} from 'react';
import {
    Box, Button,
    TextField,
    Typography
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {Link, useNavigate} from "react-router-dom";
import {PasswordReset} from "../component/PasswordReset";
import {PasswordField} from "../component/PasswordField";
import {auth} from "../firebaseConfig";
import {AuthContext} from "../context/auth/Auth";
import '../assert/auth.css'

export const SignIn = () => {

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
                className="form"
                component="form"
                onSubmit={handleSubmitEmailAndPassword}
                autoComplete="off">

                <Typography variant="h3">
                    Sign In
                </Typography>

                <TextField
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
                    <Button
                        variant="text"
                        onClick={handleOpen}>
                        Forgot password?
                    </Button>
                </div>

                <Button
                    size="large"
                    variant="contained"
                    type="submit">
                    Sign In
                </Button>

                <Link to="/sign-up"
                      variant="body1">
                    Don't have an account? Sign Up!
                </Link>

                <div className="divider">
                    <span>or</span>
                </div>

                <Button
                    size="large"
                    variant="contained"
                    onClick={handleSubmitGoogle}
                >
                    <GoogleIcon className="google-icon" fontSize="medium"/> Sign In with Google
                </Button>

            </Box>

            <PasswordReset open={open} handleClose={handleClose}/>

        </div>
    )
}
