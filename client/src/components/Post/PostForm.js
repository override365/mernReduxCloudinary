import React, { useState } from "react" ;
import { Card, Button, Typography, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { addPost } from "../../actions/postActions";

function PostForm() {
    const [postData, setPostData] = useState({ 
        body: ""
    });
    const dispatch = useDispatch();
    const btnEnabled = postData.body.length > 0;

    const clear = () => {
        setPostData({
            body: ""
        });
    }

    const onChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addPost(postData));
        clear();
    }
    return (
        <div>
            <Card>
                <Typography>
                    &nbsp;
                </Typography>
                <form noValidate onSubmit={onSubmit}>
                    <TextField 
                        fullWidth
                        variant="outlined"
                        placeholder="What's on your mind?"
                        name="body"
                        onChange={onChange}
                        value={postData.body}
                        style={{ paddingBottom: 10 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!btnEnabled}
                    >
                        Post
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default PostForm;