import React from "react";
import { extractTextFromPDF } from "../utils/pdfParser";
import { processExtractedText } from "../utils/studentProcessor";

export default function UploadPDF({ setStudentsData }) {
  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
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
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
    </div>
  );
}
