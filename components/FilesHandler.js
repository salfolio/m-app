import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './FilesHandler.module.css';

const FileHandler = () => {
  const [files, setFiles] = useState([]);

  // handle file drop
  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // concatenate arrays
    setFiles([...files, ...newFiles]);
  };

  // handle file delete
  const onDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // handle script execution
  const onRunScript = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    try {
      const response = await axios.post('/api/upload', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // render file preview cards
  const renderFiles = () =>
    files.map((file, index) => (
      <div className={styles.filePreview} key={file.name}>
        <div className={styles.fileDetails}>
          <div className={styles.fileName}>{file.name}</div>
          <div className={styles.fileSize}>{file.size / 1024} KB</div>
        </div>
        <div className={styles.fileDelete} onClick={() => onDelete(index)}>
          Delete
        </div>
      </div>
    ));

  // useDropzone hook
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });

  return (
    <div className={styles.fileHandler}>
      <div className={styles.dropZone} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={styles.dropzoneText}>
          Drag and drop files here or click to select files
        </div>
      </div>
      <div className={styles.filePreviews}>{renderFiles()}</div>
      <button className={styles.runScriptBtn} onClick={onRunScript}>
        Run Script
      </button>
    </div>
  );
};

export default FileHandler;
