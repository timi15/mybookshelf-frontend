import React, {useContext, useState} from 'react'
import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth/Auth";
import {PasswordField} from "../component/PasswordField";
import {auth} from "../firebaseConfig"
import '../assert/auth.css'

export const SignUp = () => {

    const {signUpWithEmail, signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmitEmailAndPassword = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signUpWithEmail(formData.email, formData.password);
            setFormData({name: '', email: '', password: ''});
            navigate("/sign-in");
        } catch (error) {
            console.error("Sign up error:", error.code, error.message);
        }
    };

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
                    Sign Up
                </Typography>

                <TextField
                    id="name"
                    label="Name"
                    name="name"
                    value={formData.name}
                    type="text"
                    variant="outlined"
                    required
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

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

                <Button
                    size="large"
                    variant="contained"
                    type="submit">
                    Sign Up
                </Button>

                <Link to="/sign-in"
                      variant="body1">
                    Already have an account? Sign In!
                </Link>

                <div className="divider">
                    <span>or</span>
                </div>

                <Button
                    size="large"
                    variant="contained"
                    onClick={handleSubmitGoogle}>
                    <GoogleIcon className="google-icon" fontSize="medium"/> Sign Inl with Google
                </Button>

            </Box>

        </div>

    )
}
