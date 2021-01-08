import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, makeStyles, Grid, Typography } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";

import { userLogout } from "../actions/authActions";
import { getPosts } from "../actions/postActions";
import PostForm from "../components/Post/PostForm";
import PostCard from "../components/Post/PostCard";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0
    }
}));

function Home() {
    const classes = useStyles();
    const history = useHistory();
    const { user } = useSelector(state => state.auth);
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    
    const logoutClick = (e) => {
        dispatch(userLogout());
    }
    
    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={0} style={{ paddingTop: 20 }}>
                <Grid item xs={false} sm={3} md={3} lg={3} xl={3} className="grid-item">
                    <Typography>
                        Left
                    </Typography>
                    <Typography variant="h5" style={{ paddingTop: 10 }}>
                        Hola, {user.username}
                    </Typography>
                    <Button variant="contained" color="primary" startIcon={<ExitToAppRounded />} onClick={logoutClick}>
                        Salir
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className="grid-item">
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="grid-item">
                            <Typography>
                                Recent posts
                            </Typography>
                            <PostForm />
                        </Grid>
                        {posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={12} lg={12} xl={12} className="grid-item">
                                <PostCard post={post} />
                            </Grid>    
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={false} sm={3} md={3} lg={3} xl={3} className="grid-item">
                    <Typography>
                        Right
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;