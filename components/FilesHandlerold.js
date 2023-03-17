import React from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import styles from "./FilesHandler.module.css";

export default function FilesHandlerold(props) {
  const { onDrop, ...rest } = props;

  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    // Filter the accepted files to only include XLSM files
    const xlsmFiles = acceptedFiles.filter((file) => file.type === "application/vnd.ms-excel.sheet.macroEnabled.12");
    // Add the XLSM files to the files state array
    setFiles((prevFiles) => [...prevFiles, ...xlsmFiles]);
    // Call the onDrop callback function with the XLSM files
    if (onDrop) {
      onDrop(xlsmFiles);
    }
  };

  const handleDelete = (file) => {
    // Remove the file from the files state array
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "",
    ...rest,
  });

  const runScript = () => {
    // // Make sure there are exactly 2 XLSM files uploaded
    // if (files.length !== 1) {
    //   console.log("Error: Please upload 2 XLSM files.");
    //   window.alert("Please Upload two files")
    //   return;
    // }

    
    runScriptPython(file1Path, file2Path)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div {...getRootProps()} className={styles.dropZone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the XLSM files here...</p>
        ) : (
          <p>Drag and drop XLSM files here, or click to select files</p>
        )}
      </div>
      {files.length > 0 && (
        <div>
          <h2>Uploaded files:</h2>
          <ul className={styles.filesList}>
            {files.map((file) => (
              <li key={file.name}>
                <span className={styles.fileInfo}>
                  {file.name} ({file.size} bytes)
                </span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(file)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className={styles.runButton} onClick={runScript}>Run Script</button>
    </div>
  );
}
