import React, { useState } from 'react';

function PDFUploadForm() {
    console.log('pdf upload form');
  const [pdfFiles, setPdfFiles] = useState({ resume: null, jobdescription: null });

  const handleFileChange = (e) => {
    console.log('file changed', e.target.files[0]);
    setPdfFiles(prevState => ({
      ...prevState,
      [e.target.name]: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    console.log('submitting');
    e.preventDefault();

    if (!pdfFiles.resume || !pdfFiles.jobdescription) {
      alert("Please select both PDF files.");
      return;
    }

    const formData = new FormData();
    formData.append('resume', pdfFiles.resume);
    formData.append('jobdescription', pdfFiles.jobdescription);

    try {
        console.log('sending data');
      const response = await fetch('http://localhost:4000/upload-pdfs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="resume" accept="application/pdf" onChange={handleFileChange} />
      <input type="file" name="jobdescription" accept="application/pdf" onChange={handleFileChange} />
      <button type="submit">Upload PDFs</button>
    </form>
  );
}

export default PDFUploadForm;
