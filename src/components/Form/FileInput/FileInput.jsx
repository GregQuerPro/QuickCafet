import { useState } from 'react';
import './FileInput.css';

function FileInput({ onFileChange }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    onFileChange(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  return (
    <>
        <div
        className={`file-input ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        >
        <label htmlFor="file-input" className="file-label">
            Sélectionnez un fichier ou faites-le glisser ici
        </label>
        <input
            type="file"
            id="file-input"
            className="file-input"
            accept="image/*"
            onChange={handleFileInputChange}
        />
        </div>
    </>
  );
}

export default FileInput;
