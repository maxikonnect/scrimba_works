import React, { useState } from "react";
import { extractTextFromPDF } from "../utils/pdfParser";
import { processExtractedText } from "../utils/studentProcessor";

export default function UploadPDF({ setStudentsData }) {
  const [fileName, setFileName] = useState("");

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      try {
        const text = await extractTextFromPDF(file);
        processExtractedText(text, setStudentsData);
      } catch (error) {
        console.error("❌ Failed to extract text:", error);
      }
    }
  }

  return (
    <div>
      <label className="custom-file-upload">
        <input type="file" accept="application/pdf" onChange={handleFileUpload} />
        📂 Choose a PDF File
      </label>
      {fileName && <p className="fileName">📄 {fileName}</p>}
    </div>
  );
}
