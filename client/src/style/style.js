import { createMuiTheme } from "@material-ui/core"

const light = {
    typography: {
        fontFamily: "Google Sans, Arial"
    },
    palette: {
        type: "light"
    }
} 

const dark = {
    typography: {
        fontFamily: "Google Sans, Arial"
    },
    palette: {
        type: "dark"
    }
}

export const lightTheme = createMuiTheme(light);
export const darkTheme = createMuiTheme(dark);

export const themeType = (theme) => {
    if (theme === true) {
        return darkTheme;
    } else {
        return lightTheme;
    }
}