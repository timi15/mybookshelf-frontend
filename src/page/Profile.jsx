import React, {useContext, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    TextField
} from "@mui/material";
import {AuthContext} from "../context/auth/Auth";
import {PasswordField} from "../component/PasswordField";
import {
    updatePassword,
    updateProfile
} from "firebase/auth";
import {IssueAlertContext} from "../context/IssueAlert";

export const Profile = () => {

    const {currentUser} = useContext(AuthContext);
    const {showAlert} = useContext(IssueAlertContext);

    const [avatar, setAvatar] = useState(currentUser?.photoURL || "");
    const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [password, setPassword] = useState("");

    const saveChanges = async () => {
        try {

            await updateProfile(currentUser, {
                displayName,
                photoURL: avatar || null
            });

            if (password.trim() !== "") {
                await updatePassword(currentUser, password);
            }

            showAlert("Profile updated!", "success");

        } catch (err) {
            console.log(err);
            showAlert(err.message, "error");
        }
    };

    const isDisable = currentUser.emailVerified === true;

    return (
        <>
            <Card sx={{width: "55%", margin: "auto", mt: 7, mb: 7, p: 2, borderRadius: 6, backgroundColor: "#f1ecdb"}}>
                <CardContent>

                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 2
                    }}>
                        <Avatar src={avatar} sx={{width: 120, height: 120}}/>
                    </Box>

                    <Box sx={{width: "70%", marginTop: "3rem", marginLeft: "auto", marginRight: "auto"}}>

                        <TextField
                            type="text"
                            size="small"
                            fullWidth
                            label="Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            sx={{mb: 2}}
                        />

                        <TextField
                            disabled
                            size="small"
                            type="email"
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{mb: 2}}
                        />

                        <PasswordField
                            name="password"
                            label="New Password"
                            required={false}
                            isDisabled={isDisable}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </Box>

                    <Box sx={{textAlign: "right", mt: 4}}>
                        <Button variant="contained" size="large" onClick={saveChanges}
                                style={{backgroundColor: "#3a4943"}}>
                            Save changes
                        </Button>
                    </Box>

                </CardContent>
            </Card>
        </>
    );
};
