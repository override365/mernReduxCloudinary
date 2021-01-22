import React, { useState } from "react";
import {
    Drawer, IconButton, makeStyles, List, ListItem, ListItemText
} from "@material-ui/core";
import { Menu, AccountCircle, Message, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUserProfile } from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250
    },
    icon: {
        marginRight: 15
    }
}))

const SideDrawer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector(state => state.auth);
    const [drawerState, setDrawerState] = useState({ left: false });

    const toggleDrawer = (anchor, open) => (e) => {
        if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
            return;
        }
        setDrawerState({[anchor]: open});
    };

    const goToProfile = () => {
        dispatch(getUserProfile(user.username));
        history.push(`/profile/${user.username}`);

    }

    const sideDrawerList = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List component="nav">
                <ListItem button onClick={goToProfile} >
                    <AccountCircle className={classes.icon}/>
                    <ListItemText primary="Profile"/>
                </ListItem>
                <ListItem button>
                    <Message className={classes.icon}/>
                    <ListItemText primary="Messages"/>
                </ListItem>
                <ListItem button>
                    <Settings className={classes.icon}/>
                    <ListItemText primary="Settings"/>
                </ListItem>
            </List>
            
        </div>
    );

    return (
        <>
            <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer("left", true)}
            >
                <Menu style={{ color: "white"}}/>
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerState.left}
                onClose={toggleDrawer("left", false)}
            >
                {sideDrawerList("left")}
            </Drawer>
        </>
    );
};

export default SideDrawer;
