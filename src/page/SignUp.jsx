import React, {useContext, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import {auth} from "../config/firebaseConfig"
import {AuthContext} from "../context/auth/Auth";
import {PasswordField} from "../component/PasswordField";
import GoogleIcon from '@mui/icons-material/Google';
import '../assert/css/auth.css'
import {IssueAlertContext} from "../context/IssueAlert";

export const SignUp = () => {

    const {signUpWithEmail, signInWithGoogle} = useContext(AuthContext);
    const {showAlert} = useContext(IssueAlertContext);
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
            showAlert(error.message.split(":")[1], 'error');
        }
    };

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
                    Sign Up
                </Typography>

                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    size="small"
                    variant="outlined"
                    required
                    value={formData.name}
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    size="small"
                    variant="outlined"
                    required
                    value={formData.email}
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

                <PasswordField
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                />

                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    style={{backgroundColor: "#3a4943"}}
                >
                    Sign Up
                </Button>

                <div className="link-container">
                    <Link className="link" to="/sign-in" variant="body1">
                        Already have an account? Login!
                    </Link>
                </div>

                <div className="divider">
                    <span>or</span>
                </div>

                <Button
                    size="large"
                    variant="contained"
                    style={{backgroundColor: "#3a4943"}}
                    onClick={handleSubmitGoogle}>
                    <GoogleIcon className="google-icon" fontSize="medium"/>
                    Login with Google
                </Button>

            </Box>

        </div>

    )
}
