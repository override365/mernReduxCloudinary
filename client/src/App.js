import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import "./style/main.css";
import { lightTheme, darkTheme } from "./style/style";

import { PrivateRoute } from "./components/Private/PrivateRoute";
import Profile from "./components/User/Profile";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostDetail from "./components/Post/PostDetail";

//---test---
import JustATest from "./components/Test/Test";

function App() {
    const user = useSelector(state => state.auth);
    const theme = useSelector(state => state.darkMode);
    
    return (
        <Router>
            <ThemeProvider theme={theme === "disabled" ? lightTheme : darkTheme}>
                <CssBaseline />
                <Navbar />
                <Container maxWidth="lg">
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Switch>
                        <PrivateRoute exact path="/home" auth={user} component={Home} />
                    </Switch>    
                    <Route exact path="/post/:id" component={PostDetail}/>
                    <Route exact path="/profile/:username" component={Profile} />
                    <Route exact path="/test" component={JustATest} />
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;