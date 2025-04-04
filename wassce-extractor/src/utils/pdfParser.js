import * as pdfjsLib from "pdfjs-dist";

// Set worker source manually
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export async function extractTextFromPDF(file) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onload = async (e) => {
      try {cd
        const arrayBuffer = e.target.result;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let extractedText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          extractedText += textContent.items.map((item) => item.str).join(" ") + "\n";
        }

        resolve(extractedText);
      } catch (error) {
        reject(error);
      }
    };
  });
}
