import React, {useContext, useState} from 'react'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    Menu
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Outlet, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth/Auth";

export const Layout = () => {

    const {logout, currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const pages = [
        {name: 'Best Sellers', route: '/home'},
        {name: 'Library', route: '/library'},
        {name: 'Loved', route: '/loved'},
        {name: 'To Read', route: '/to-read'},
        {name: 'Reviews', route: '/reviews'},
    ];

    const settings = [
        {name: 'Profile', route: '/profile'},
        {name: 'Logout', route: '/logout'},
    ];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (route) => {
        if (route) {
            navigate(route);
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (route) => {
        if (route) {
            navigate(route);
        }
        setAnchorElUser(null);
    };

    return (
        <React.Fragment>
            <AppBar position="sticky" style={{backgroundColor:' #3a4943'}}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={() => setAnchorElUser(null)}
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem key={index} onClick={() => handleCloseNavMenu(page.route)}>
                                        <Typography sx={{textAlign: 'center'}}>{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{flexGrow: 1, justifyContent: "center", display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handleCloseNavMenu(page.route)}
                                    sx={{my: 2, color: 'white', display: 'block', marginRight: '3rem'}}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        alt="User Avatar"
                                        src={currentUser?.photoURL || "/static/images/avatar/2.jpg"}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={() => setAnchorElUser(null)}
                            >
                                {settings.map((setting, index,) => (
                                    <MenuItem key={index} onClick={() => {
                                        if (setting.route === '/logout') {
                                            logout();
                                            navigate("/sign-in")
                                        } else {
                                            handleCloseUserMenu(setting.route);
                                        }
                                    }}>

                                        <Typography sx={{textAlign: 'center'}}>{setting.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Outlet/>

        </React.Fragment>
    )
}
