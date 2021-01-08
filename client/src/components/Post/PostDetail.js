import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    Grid, Avatar, Card, CardHeader, CardContent, CardActions, IconButton, makeStyles, Typography
} from "@material-ui/core";

import { getPosts } from "../../actions/postActions";

function PostDetail({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts.find(post => post._id === id));
    
    useEffect(() => {
        if (!post) {
            dispatch(getPosts());
        }
    }, [dispatch]);

    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        );
    }

    return (
        <>
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className="grid-item">
                <Card >
                    <CardHeader 
                        avatar={
                            <Avatar>
                                {post.username.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={post.username}
                    />
                    <CardContent>
                        <Typography variant="h5">
                            {post.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Typography>
                            action buttons here
                        </Typography>
                    </CardActions>
                </Card>
                
            </Grid>
        </Grid>
        </>
    );
}

export default PostDetail;