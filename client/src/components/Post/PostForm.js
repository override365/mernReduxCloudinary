import React, { useState } from "react" ;
import axios from "axios";
import { Button, TextField, IconButton, CircularProgress } from "@material-ui/core";
import { ImageSearch, Cancel } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import { addPost } from "../../actions/postActions";

function PostForm() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState({ 
        body: ""
    });
    const [fileInput, setFileInput] = useState("");
    const [previewSource, setPreviewSource] = useState();
    
    const btnEnabled = postData.body.length > 0;

    const onChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    const displayPreview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const discardImage = () => {
        setPreviewSource("");
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        displayPreview(file);
    }

    const uploadImageToCloudinary = async (base64EncodedImage) => {
        const imageBase = JSON.stringify({ data: base64EncodedImage });
        try {
            const { data:response } = await axios.post("/upload/image", imageBase, {
                headers: { "Content-Type": "application/json" }
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const clear = () => {
        setPostData({body: ""});
        setPreviewSource("");
    }

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!previewSource) {
            let newObject = {
                body: postData.body,
                url: ""
            }
            dispatch(addPost(newObject));
            clear();
        } else {
            const imagen = await uploadImageToCloudinary(previewSource);
            let newObjectWithImg = {
                body: postData.body,
                url: imagen.url
            }
            dispatch(addPost(newObjectWithImg));
            clear();
        }
        setLoading(false)
    }
    return (
        <>
        {loading === true ? 
            <CircularProgress /> 
            :
            <div>
                <form noValidate onSubmit={onSubmit}>
                    <TextField 
                        fullWidth
                        variant="outlined"
                        placeholder="What's on your mind?"
                        name="body"
                        onChange={onChange}
                        value={postData.body}
                        style={{ paddingBottom: 5 }}
                        multiline
                        rowsMax={7}
                    />
                    {previewSource && (
                        <>
                            <img src={previewSource} alt="" style={{ height: 200 }} />
                            <IconButton style={{ float: "left" }} onClick={discardImage}>
                                <Cancel />
                            </IconButton>
                        </>
                    )}
                    <br/>
                    <IconButton component="label" >
                        <ImageSearch />
                        <input type="file" accept="image/*"  name="image" onChange={handleFileInput} value={fileInput} hidden />
                    </IconButton>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!btnEnabled}
                        style={{ float: "right", borderRadius: 50, textTransform: "none", marginTop: 5 }}
                    >
                        Post
                    </Button>
                </form>
            </div>
        }
        </>
    );
}

export default PostForm;