import { createContext, useState, useEffect } from "react";

// Create Context
export const PDFContext = createContext();

export function PDFProvider({ children }) {
  const [pdfFile, setPdfFile] = useState(localStorage.getItem("uploadedPDF") || null);

  // Store the PDF in localStorage
  useEffect(() => {
    if (pdfFile) {
      localStorage.setItem("uploadedPDF", pdfFile);
    }
  }, [pdfFile]);

  return (
    <PDFContext.Provider value={{ pdfFile, setPdfFile }}>
      {children}
    </PDFContext.Provider>
  );
}
