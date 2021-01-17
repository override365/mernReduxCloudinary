import React from "react";
import { 
    Avatar, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton, makeStyles, Typography 
} from "@material-ui/core";
import { QuestionAnswerOutlined } from "@material-ui/icons";
import { red, blue } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";

import { stringToColor } from "../../utils/RandomColor";
import { getPostDetail } from "../../actions/postActions";
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
    },
    media: {
        height: 0,
        paddingTop: "56.25%"
    }
}));

function PostCard({ post: { body, imageUrl, createdAt, _id, username, comments, likes }}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector(state => state.auth);
    const likeCount = likes.length;
    const commentCount = comments.length;
    const goToPostDetail = (e) => {
        dispatch(getPostDetail(_id));
        history.push(`/post/${_id}`);
    };
    return (
        <div className={classes.root}>
            <Card className={classes.root}>
                    <CardHeader 
                        avatar={
                            <Avatar 
                                // className={classes.avatar} 
                                style={{ backgroundColor: stringToColor(username) }}
                            >
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={username}
                        subheader={moment(createdAt).locale("es").fromNow()}
                    />
                    <CardContent>
                        <Typography>
                            {body}
                        </Typography>
                    </CardContent>
                    {imageUrl && (
                        <CardMedia 
                            className={classes.media}
                            image={imageUrl}
                        />
                    )}
                <CardActions disableSpacing style={{ padding: 1 }}>
                    <LikeButton user={user} post={{ _id, likes }} />
                    <Typography>
                        {likeCount}
                    </Typography>
                    <IconButton onClick={goToPostDetail}>
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