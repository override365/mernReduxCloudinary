import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Grid } from "@material-ui/core";

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
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    
    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={0} style={{ paddingTop: 20 }}>
                <Grid item xs={false} sm={2} md={3} lg={3} xl={3} className="grid-item">
                    
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} className="grid-item">
                    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="grid-item">
                            <PostForm />
                        </Grid>
                        {posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={12} lg={12} xl={12} className="grid-item">
                                <PostCard post={post} />
                            </Grid>    
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={false} sm={2} md={3} lg={3} xl={3} className="grid-item">
                    
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;