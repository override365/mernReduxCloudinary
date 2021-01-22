import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Landing() {
    const loginState = useSelector(state => state.auth.isAuthenticated);
    const history = useHistory();

    useEffect(() => {
        if (loginState !== false) {
            history.push("/home");
        }
    }, [loginState])

    
    return (
        <h1>
            Landing
        </h1>
    );
}

export default Landing;