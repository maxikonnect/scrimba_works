import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { getDocument } from "pdfjs-dist";

const PdfOcrExtractor = () => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setText("Processing...");

        try {
            const extractedText = await extractTextFromPdf(file);
            setText(extractedText);
        } catch (error) {
            console.error("Error extracting text:", error);
            setText("Failed to extract text.");
        }

        setLoading(false);
    };

    const extractTextFromPdf = async (file) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = async () => {
                try {
                    const pdfData = new Uint8Array(reader.result);
                    const pdf = await getDocument({ data: pdfData }).promise;
                    let fullText = "";

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const canvas = document.createElement("canvas");
                        const viewport = page.getViewport({ scale: 2 });

                        const context = canvas.getContext("2d");
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        await page.render({ canvasContext: context, viewport }).promise;

                        const imageData = canvas.toDataURL("image/png");

                        const { data } = await Tesseract.recognize(imageData, "eng", {
                            logger: (m) => console.log(m),
                        });

                        fullText += `Page ${i}:\n${data.text}\n\n`;
                    }

                    resolve(fullText || "No text found.");
                } catch (error) {
                    reject(error);
                }
            };

            reader.readAsArrayBuffer(file);
        });
    };

    return (
        <div>
            <h2>Upload Scanned PDF for OCR Text Extraction</h2>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            {loading ? <p>Extracting text, please wait...</p> : <textarea value={text} rows="10" cols="50" readOnly />}
        </div>
    );
};

export default PdfOcrExtractor;
