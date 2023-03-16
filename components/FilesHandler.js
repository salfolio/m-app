import React from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import styles from "./FilesHandler.module.css";

export default function FilesHandler(props) {
  const { onDrop, ...rest } = props;

  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    // Filter the accepted files to only include CSV files
    const csvFiles = acceptedFiles.filter((file) => file.type === "text/csv");
    // Add the CSV files to the files state array
    setFiles((prevFiles) => [...prevFiles, ...csvFiles]);
    // Call the onDrop callback function with the CSV files
    if (onDrop) {
      onDrop(csvFiles);
    }
  };

  const handleDelete = (file) => {
    // Remove the file from the files state array
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: ".csv",
    ...rest,
  });

  return (
    <div>
      <div {...getRootProps()} className={styles.dropZone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the CSV files here...</p>
        ) : (
          <p>Drag and drop CSV files here, or click to select files</p>
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
      <button className={styles.runButton}>Run Script</button>
    </div>
  );
}
