import React from "react";
import { AppBar, Button, makeStyles, IconButton, Toolbar, Typography } from "@material-ui/core";
import { FilterTiltShiftOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    toolBar: {
        minHeight: 40
    }
}));

function NavBar() {
    const classes = useStyles();
    const loginState = useSelector(state => state.auth);

    return (
        <div className={classes.root}>
            {loginState.isAuthenticated ? 
            <AppBar position="static" >
                <Toolbar className={classes.toolBar} >
                    <IconButton href="/home" edge="start" className={classes.menuButton} color="inherit">
                        <FilterTiltShiftOutlined />
                    </IconButton>
                    <Typography className={classes.title}>

                    </Typography>
                    <Button color="inherit">
                        {loginState.user.username}
                    </Button>
                </Toolbar>
            </AppBar>   
        : (
            <AppBar position="static" >
                <Toolbar className={classes.toolBar} >
                    <IconButton href="/" edge="start" className={classes.menuButton} color="inherit">
                        <FilterTiltShiftOutlined />
                    </IconButton>
                    <Typography className={classes.title}>

                    </Typography>
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