import React from "react";
import { AppBar, Button, makeStyles, IconButton, Toolbar, Typography } from "@material-ui/core";
import { FilterTiltShiftOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

function NavBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
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
        </div>
    );
}

export default NavBar;