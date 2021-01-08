import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  IconButton, makeStyles } from "@material-ui/core";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

import { likePost } from "../../actions/postActions";

const useStyles = makeStyles((theme) => ({
    likeIcon: {
        color: red[500]
    }
}));

function LikeButton({ user, post: { _id, likes, likeCount } }) {
    const classes = useStyles();
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const likePostClick = () => {
        dispatch(likePost(_id));
    }

    const likeButtonStyle = user ? (
        liked ? (
            <IconButton onClick={likePostClick} >
                <FavoriteOutlined className={classes.likeIcon} />
            </IconButton>
        ) : (
            <IconButton onClick={likePostClick} >
                <FavoriteBorderOutlined className={classes.likeIcon} />
            </IconButton>
        )
    ) : (
        <IconButton href="/login">
                <FavoriteBorderOutlined className={classes.likeIcon} />
        </IconButton>
    )

    return (
        <div>
            {likeButtonStyle}
        </div>
    );
}

export default LikeButton;