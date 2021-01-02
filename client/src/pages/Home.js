import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";

import { userLogout } from "../actions/authActions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0
    }
}));

function Home() {
    const classes = useStyles();
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logoutClick = (e) => {
        dispatch(userLogout());
    }
    
    return (
        <div className={classes.root}>
            <Typography variant="h5" style={{ paddingTop: 10 }}>
                Hola, {user.username.split(" ")[0]}
            </Typography>
            <Button variant="contained" color="primary" startIcon={<ExitToAppRounded />} onClick={logoutClick}>
                Salir
            </Button>
        </div>
    );
}

export default Home;