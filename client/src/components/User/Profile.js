import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import moment from "moment/min/moment-with-locales";

import PostCard from "../Post/PostCard";
import { getUserProfile } from "../../actions/userActions";
import { getPosts } from "../../actions/postActions";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: 15
    },
    joinedSection: {
        display: "flex",
        marginTop: 5,
        marginBottom: 10
    },
    joinedDate: {
        marginLeft: 5
    }
}));

function Profile({ match }) {
    const classes = useStyles();
    const { username } = match.params;
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.user);
    const posts = useSelector(state => state.posts);

    useEffect(() => {
        if (profile.username !== username) {
            dispatch(getUserProfile(username));
            dispatch(getPosts()); // change to only fetch posts from the user
        }
    }, [dispatch]);

    if (profile.username !== username) {
        return (
            <section>
                <h3>User not found</h3>
            </section>
        )
    }
    
    return (
        <>
            <Grid container justify="center" spacing={0} style={{ paddingTop: 20 }} >
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} className="grid-item">
                    <Avatar className={classes.avatar} />    
                    <Typography variant="h6">
                        {profile.firstName} {profile.lastName}
                    </Typography>
                    <Typography variant="body2" >
                        {profile.username}
                    </Typography>
                    <div className={classes.joinedSection}>
                        <CalendarToday />
                        <Typography className={classes.joinedDate}>
                            Joined &nbsp;
                            {moment(profile.joined).locale("es").format("MMMM YYYY")}
                        </Typography>
                    </div>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        {posts.filter((post) => post.username === profile.username).map((post) => (
                            <Grid item key={post._id} xs={12} sm={12} md={12} lg={12} xl={12} className="grid-item">
                                <PostCard post={post} />
                            </Grid>
                        ))}
                    </Grid>
                    
                </Grid>
            </Grid>
            
        </>
    );
}

export default Profile;