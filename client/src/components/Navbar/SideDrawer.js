import {
    Drawer, IconButton, List, ListItem, ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250
    }
}))

const SideDrawer = () => {
    const classes = useStyles();
    const [drawerState, setDrawerState] = useState({ left: false });

    const toggleDrawer = (anchor, open) => e => {
        if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
            return;
        }
        setDrawerState({ [anchor]: open });
    };

    const sideDrawerList = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List component="nav">
                {["Profile", "Messages", "Settings"].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
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
                <Menu />
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
