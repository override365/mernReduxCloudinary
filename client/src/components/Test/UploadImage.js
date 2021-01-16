import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

function UploadImage() {
    const [fileInput, setFileInput] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [previewSource, setPreviewSource] = useState()
    
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImageToCD(previewSource);
    }

    const uploadImageToCD = async (base64EncodedImage) => {
        const imageBase = JSON.stringify({ data: base64EncodedImage });
        try {
            await axios.post("/test/upload", imageBase, {
                headers: { "Content-Type": "application/json" }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <h1>
            insert image here!
        </h1>
        <form noValidate onSubmit={handleSubmit} >
            <Button variant="contained" component="label">
                Browse Image
                <input type="file" name="image" onChange={handleFileInput} value={fileInput} hidden/>
            </Button>&nbsp;
            <Button variant="contained" type="submit" >
                Upload
            </Button>
        </form>
        {previewSource && (
            <img src={previewSource} alt="" style={{ height: 300 }} />
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