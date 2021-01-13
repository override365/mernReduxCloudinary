import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    Grid, Avatar, Card, CardHeader, CardContent, CardActions, IconButton, makeStyles, Typography, TextField, Button
} from "@material-ui/core";
import moment from "moment";

import { getPosts, commentPost } from "../../actions/postActions";
import LikeButton from "./LikeButton";

function PostDetail({ match }) {
    const [commentData, setCommentData] = useState({
        body: ""
    });
    const { id } = match.params;
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
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

    const { _id, likes } = post;

    const onChange = (e) => {
        setCommentData({ ...commentData, [e.target.name]: e.target.value });
    }
    const btnEnabled = commentData.body.length > 0;

    const submitComment = (e) => {
        e.preventDefault();
        // console.log(_id, commentData);
        dispatch(commentPost(_id, commentData));
    }

    return (
        <>
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className="grid-item">
                <Card style={{ marginBottom: 15, marginTop: 15 }}>
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
                    <CardActions style={{ paddingLeft: 15 }}>
                        <Typography>
                            {moment(post.createdAt).format("h:mm a - MMMM Do YYYY")}
                        </Typography>
                    </CardActions>
                    <CardActions style={{ paddingLeft: 15 }}>
                        <Typography variant="subtitle2">
                            {post.likes.length} likes
                        </Typography>
                        <Typography variant="subtitle2">
                            {post.comments.length} comments
                        </Typography>
                    </CardActions>
                    <CardActions style={{ padding: 1 }} >
                        <LikeButton user={user} post={{ _id, likes }} />
                        <Typography>
                            action buttons here
                        </Typography>
                    </CardActions>
                </Card>
                <Card>
                    <form noValidate>
                        <TextField 
                            fullWidth
                            variant="outlined"
                            placeholder="Reply ...?"
                            name="body"
                            value={commentData.body}
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!btnEnabled}
                            onClick={submitComment}
                        >
                           Reply 
                        </Button>
                    </form>
                </Card>
                {post.comments.map(comment => (
                    <Card key={comment._id} style={{ marginTop: 5 }}>
                        <CardHeader 
                            avatar={
                                <Avatar>
                                    {comment.username.charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            title={comment.username}
                        />
                        <CardContent>
                            <Typography>
                                {comment.body}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}     
            </Grid>
        </Grid>
        </>
    );
}

export default PostDetail;