import React, { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [image, setImage] = useState({
    // Initially, no file is selected
    selectedFile: null,
  });

  // On file select (from the pop up)
  function onFileChange(event) {
    // Update the state
    setImage({ selectedFile: event.target.files[0] });
  }

  // On file upload (click the upload button)
  function onFileUpload() {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", image.selectedFile, image.selectedFile.name);

    // Details of the uploaded file
    console.log(image.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  }

  // File content to be displayed after
  // file upload is complete
  function fileData() {
    if (image.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {image.selectedFile.name}</p>

          <p>File Type: {image.selectedFile.type}</p>

          <p>
            Last Modified: {image.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h1> What to do</h1>
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  }

  return (
    <div>
      <h1>GeeksforGeeks</h1>
      <h3>File Upload using React!</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
    </div>
  );
}
