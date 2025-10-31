import React, {useState} from 'react'
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../firebaseConfig"
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../assert/auth.css'

export const SignUp = () => {

    const provider = new GoogleAuthProvider();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const signUpWithEmailAndPassword = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {

                const user = userCredential.user;
                setFormData({name: '', email: '', password: ''})

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, " ", errorMessage);
            });
    }

    const signUpWithGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {

                //const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;

            }).catch((error) => {
                //error
            });
    }

    return (
        <div className='box'>

            <Box
                className="form"
                component="form"
                onSubmit={signUpWithEmailAndPassword}
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

                <FormControl variant="outlined" required>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        label="Password"
                        value={formData.password}
                        type={showPassword ? 'text' : 'password'}
                        onChange={({target: {name, value}}) => setFormData({...formData, [name]: value})}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    className="password-show-icon"
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"

                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button
                    size="large"
                    variant="contained"
                    type="submit">
                    Sing Up
                </Button>

                <Typography
                    variant="body1"
                    component="h2">
                    Already have an account? Sign In!
                </Typography>

                <div className="divider">
                    <span>or</span>
                </div>

                <Button
                    size="large"
                    variant="contained"
                    onClick={signUpWithGoogle}>
                    <GoogleIcon className="google-icon" fontSize="medium"/> Sing Up with Google
                </Button>

            </Box>

        </div>

    )
}
