import React from "react";
import { 
    Avatar, Card, CardHeader, CardContent, CardActions, IconButton, makeStyles, Typography 
} from "@material-ui/core";
import { QuestionAnswerOutlined } from "@material-ui/icons";
import { red, blue } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import moment from "moment";

import LikeButton from "./LikeButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0
    },
    avatar: {
        backgroundColor: red[500]
    },
    deleteIcon: {
        color: red[500]
    },
    likeIcon: {
        color: red[500]
    },
    commentIcon: {
        color: blue[500]
    }
}));

function PostCard({ post: { body, createdAt, _id, username, comments, likes }}) {
    const classes = useStyles();
    const { user } = useSelector(state => state.auth);
    const likeCount = likes.length;
    const commentCount = comments.length;
    return (
        <div className={classes.root}>
            <Card className={classes.root}>
                <CardHeader 
                    avatar={
                        <Avatar className={classes.avatar} >
                            {username.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={username}
                    subheader={moment(createdAt).fromNow()}
                />
                <CardContent>
                    <Typography>
                        {body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <LikeButton user={user} post={{ _id, likes }} />
                    <Typography>
                        {likeCount}
                    </Typography>
                    <IconButton>
                        <QuestionAnswerOutlined className={classes.commentIcon} />
                    </IconButton>
                    <Typography>
                        {commentCount}
                    </Typography>
                </CardActions>
            </Card>
        </div>
    );
}

export default PostCard;