import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { addPost } from "../../actions/postActions";

function UploadImage() {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        body: ""
    });
    const [imgUrl, setImgUrl] = useState({});
    const [fileInput, setFileInput] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [previewSource, setPreviewSource] = useState()

    const onChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        setPreviewSource(reader.result);
        };
    }

    const uploadImageToCD = async (base64EncodedImage) => {
        const imageBase = JSON.stringify({ data: base64EncodedImage });
        try {
            const {data:response} = await axios.post("/test/upload", imageBase, {
                headers: { "Content-Type": "application/json" }
            });
            setImgUrl(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!previewSource) {
            let newObject = {
                body: postData.body,
                url: ""
            }
            dispatch(addPost(newObject));
        } else {
            const imagen = await uploadImageToCD(previewSource);
            let newObjectWithImg = {
                body: postData.body,
                url: imagen.url
            }
            dispatch(addPost(newObjectWithImg));
        }
    }

    return (
        <>
        <h1>
            insert image here!
        </h1>
        <form noValidate onSubmit={handleSubmit} >
            <TextField 
                variant="outlined"
                placeholder="What's on your mind?"
                name="body"
                onChange={onChange}
                value={postData.body}
                style={{ paddingBottom: 5, width: 300 }}
            />
            <br/>
            <Button variant="contained" component="label">
                Browse Image
                <input type="file" name="image" onChange={handleFileInput} value={fileInput} hidden/>
            </Button>&nbsp;
            <Button 
                variant="contained" 
                type="submit"
            >
                Post
            </Button>
        </form>
        {previewSource && (
            <img src={previewSource} alt="" style={{ height: 300 }} />
        )}
        {imgUrl && (
            <p> {imgUrl.url} </p>
        )}
        </>
    );
}

export default UploadImage;

// fetch("https://api.cloudinary.com/v1_1/strack/image/upload", {
        //     method: "POST",
        //     body: formData
        // })
        // .then((response) => {
        //     console.log(response);
        // })
        // .catch((error) => {
        //     console.log(error);
        // })