import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import "./style/main.css";
import { theme } from "./style/style";


import { PrivateRoute } from "./components/private/PrivateRoute";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
    const user = useSelector(state => state.auth);
    
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <Container maxWidth="lg">
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Switch>
                        <PrivateRoute exact path="/home" auth={user} component={Home} />
                    </Switch>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;

