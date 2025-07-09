import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import PDFScannCom from '../components/PDFScannCom';


function OCRUploader() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      extractTextFromImage(file);
    }
  };

  function extractTextFromImage(imageFile) {
    setLoading(true);
    Tesseract.recognize(
      imageFile,
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: 300, marginTop: 10 }} />}
      {loading && <p>Processing image, please wait...</p>}
      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <pre>{text}</pre>
        </div>
      )}
      <PDFScannCom/>
    </div>
  );
}

export default OCRUploader;
