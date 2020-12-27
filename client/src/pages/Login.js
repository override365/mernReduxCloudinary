import React, { useState } from "react";
import { Button, CircularProgress, makeStyles, Link, Grid, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0
    }
}));

function Login() {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const loginUser = {
            email: input.email,
            password: input.password
        }
        console.log(loginUser);
    }

    return (
        <div>
            <form onSubmit={onSubmit} noValidate>
                <div className={classes.root}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        <Typography variant="h5" style={{ paddingTop: 25, paddingBottom: 5 }}>Iniciar Sesi&oacute;n</Typography>
                        <Grid item xs={12} sm={7} md={5} lg={4} xl={4} className="grid-item">
                            <TextField 
                                fullWidth
                                size="small"
                                type="email"
                                variant="outlined"
                                label="Correo"
                                name="email"
                                value={input.email}
                                onChange={onChange}
                                error={errors.email ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={7} md={5} lg={4} xl={4} className="grid-item">
                            <TextField 
                                fullWidth
                                size="small"
                                type="password"
                                variant="outlined"
                                label="Contraseña"
                                name="password"
                                value={input.password}
                                onChange={onChange}
                                error={errors.password ? true : false}
                            />
                        </Grid>
                        <Grid item xs={8} sm={5} md={4} lg={3} xl={3} className="grid-item" style={{ paddingTop: 20 }}>
                            <Button type="submit" variant="contained" color="primary" style={{ height: 40 }} fullWidth>
                                Iniciar Sesi&oacute;n
                            </Button>
                            <Typography style={{ paddingTop: 10 }}>
                                ¿No tienes una cuenta?
                                <Link href="/register"> Reg&iacute;strate</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
    );
}

export default Login;

