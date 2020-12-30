import React, { useState } from "react";
import { Button, CircularProgress, makeStyles, Link, Grid, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/authActions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0
    }
}));

function Register() {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const dispatch = useDispatch();

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // const newUser = {
        //     firstName: input.firstName,
        //     lastName: input.lastName,
        //     username: input.username,
        //     email: input.email,
        //     password: input.password,
        //     // confirmPassword: input.confirmPassword,
        //     createdAt: new Date().toISOString()
        // }
        dispatch(registerUser(input))
        console.log(input);
    }

    return (
        <div>
            <form onSubmit={onSubmit} noValidate>
                <div className={classes.root}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        <Typography variant="h5" style={{ paddingTop: 25, paddingBottom: 5 }}>Registrarse</Typography>
                        <Grid item xs={12} sm={7} md={5} lg={4} xl={4} className="grid-item">
                            <TextField 
                                fullWidth
                                size="small"
                                variant="outlined"
                                label="Nombre"
                                name="firstName"
                                value={input.firstName}
                                onChange={onChange}
                                error={errors.firstName ? true : false}
                            />    
                        </Grid>
                        <Grid item xs={12} sm={7} md={5} lg={4} xl={4} className="grid-item">
                            <TextField 
                                fullWidth
                                size="small"
                                variant="outlined"
                                label="Apellido"
                                name="lastName"
                                value={input.lastName}
                                onChange={onChange}
                                error={errors.lastName ? true : false}
                            />    
                        </Grid>
                        <Grid item xs={12} sm={7} md={5} lg={4} xl={4} className="grid-item">
                            <TextField 
                                fullWidth
                                size="small"
                                variant="outlined"
                                label="Usuario"
                                name="username"
                                value={input.username}
                                onChange={onChange}
                                error={errors.username ? true : false}
                            />    
                        </Grid>
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
                        <Grid item xs={12} sm={7} md={5} lg={4} xl={4} className="grid-item">
                            <TextField 
                                fullWidth
                                size="small"
                                type="password"
                                variant="outlined"
                                label="Confirmar contraseña"
                                name="confirmPassword"
                                value={input.confirmPassword}
                                onChange={onChange}
                                error={errors.confirmPassword ? true : false}
                            />    
                        </Grid>
                        <Grid item xs={8} sm={5} md={4} lg={3} className="grid-item" style={{ paddingTop: 20 }}>
                            <Button type="submit" variant="contained" color="primary" style={{ height: 40 }} fullWidth>
                                Registrarse
                            </Button>
                            <Typography style={{ paddingTop: 10 }}>
                                ¿Ya tienes una cuenta?
                                <Link href="/login"> Iniciar Sesi&oacute;n</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
    );
}

export default Register;

