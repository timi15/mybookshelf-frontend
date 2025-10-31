import React, {useState} from 'react'
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {
    Box, Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import GoogleIcon from "@mui/icons-material/Google";
import {PasswordReset} from "../component/PasswordReset";
import {auth} from "../firebaseConfig";
import '../assert/auth.css'

export const SignIn = () => {

    const provider = new GoogleAuthProvider();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const signInWithEmailAndPasswordFun = async (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, " ", errorMessage);
            });
    }

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {

                //const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;

            }).catch((error) => {

            });
    }

    return (
        <div className='box'>

            <Box
                className="form"
                component="form"
                onSubmit={signInWithEmailAndPasswordFun}
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
                    Sing In
                </Button>

                <Typography
                    variant="body1">
                    Don't have an account? Sign Up!
                </Typography>

                <div className="divider">
                    <span>or</span>
                </div>

                <Button
                    size="large"
                    variant="contained"
                    onClick={signInWithGoogle}
                >
                    <GoogleIcon className="google-icon" fontSize="medium"/> Sing In with Google
                </Button>

            </Box>

            <PasswordReset open={open} handleClose={handleClose}/>

        </div>
    )
}
