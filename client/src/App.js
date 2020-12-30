import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@material-ui/core";
import { useDispatch } from "react-redux";

import "./style/main.css";
import { theme } from "./style/style";

import { registerUser } from "./actions/authActions";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
    const dispatch = useDispatch();

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <Container maxWidth="lg">
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/home" component={Home} />
                </Container>
            </ThemeProvider>
        </Router>
    );

}

export default App;

