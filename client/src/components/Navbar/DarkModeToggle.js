import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { Switch } from "@material-ui/core";

import { getTheme, setTheme } from "../../actions/styleActions";

function DarkModeToggle() {
    const dispatch = useDispatch();
    const [darkTheme, setDarkTheme] = useState(false);
    
    useEffect(() => {
        const currentTheme = localStorage.getItem("darkMode");
        if (currentTheme) {
            (currentTheme === "disabled") ? setDarkTheme(false) : setDarkTheme(true);
        } else {
            setDarkTheme(false);
            localStorage.setItem("darkMode", "disabled");
        }
        dispatch(getTheme());
    }, [])

    const handleSwitchTheme = () => {
        if (darkTheme === false) {
            setDarkTheme(true);
            localStorage.setItem("darkMode", "enabled");
        } else {
            setDarkTheme(false);
            localStorage.setItem("darkMode", "disabled");
        }
        dispatch(setTheme(darkTheme));
    }

    return (
        <Switch 
            color="secondary"
            checked={darkTheme}
            onChange={handleSwitchTheme}
        />
    );
}

export default DarkModeToggle;