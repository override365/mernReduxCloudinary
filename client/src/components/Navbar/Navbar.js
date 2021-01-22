import React, { useState } from "react";
import { FilterTiltShiftOutlined, AccountCircle } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { 
    AppBar, Button, makeStyles, IconButton, Menu, MenuItem, Toolbar, Typography
} from "@material-ui/core";

import SideDrawer from "./SideDrawer";
import DarkModeToggle from "./DarkModeToggle";
import { userLogout } from "../../actions/authActions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    homeButton: {
        textTransform: "none"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    toolBar: {
        minHeight: 40
    },
    menuPaper: {
        backgroundColor: "#3f51b5",
        color: "white"
    }
}));

function NavBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.auth);
    const [dropMenu, setDropMenu] = useState(null);
    const openDropMenu = Boolean(dropMenu);
    
    const handleMenu = (e) => {
        setDropMenu(e.currentTarget);
    }

    const handleClose = () => {
        setDropMenu(null);
    }

    const logoutClick = () => {
        dispatch(userLogout());
        setDropMenu(null);
    }

    return (
        <div className={classes.root}>
            {loginState.isAuthenticated ? 
            <>
            <AppBar position="static" >
                <Toolbar className={classes.toolBar} >
                    <SideDrawer />
                    <Button color="inherit" className={classes.homeButton} href="/home">
                        <Typography>
                            Home
                        </Typography>
                    </Button>
                    <Typography className={classes.title}>
                        
                    </Typography>
                    <DarkModeToggle />
                    <IconButton 
                        aria-haspopup="true"
                        aria-controls="menu-appbar"
                        color="inherit" 
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={dropMenu}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={openDropMenu}
                        onClose={handleClose}
                        classes={{ paper: classes.menuPaper }}
                    >
                        <MenuItem onClick={handleClose} >@{loginState.user.username}</MenuItem>
                        <MenuItem onClick={logoutClick} >Log out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
        : (
            <AppBar position="static" >
                <Toolbar className={classes.toolBar} >
                    <IconButton href="/" edge="start" className={classes.menuButton} color="inherit">
                        <FilterTiltShiftOutlined />
                    </IconButton>
                    <Typography className={classes.title}>

                    </Typography>
                    <DarkModeToggle />
                    <Button href="/login" color="inherit">
                        Login
                    </Button>
                    <Button href="/register" color="inherit">
                        Register
                    </Button>
                </Toolbar>
            </AppBar> 
        )}
        </div>
    );
}

export default NavBar;