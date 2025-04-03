import tkinter as tk
from tkinter import filedialog
from spire.pdf import PdfDocument
from spire.ocr import OcrScanner, ConfigureOptions

# Function to open a file dialog and select a PDF
def select_pdf():
    root = tk.Tk()
    root.withdraw()  # Hide the main window
    file_path = filedialog.askopenfilename(filetypes=[("PDF Files", "*.pdf")])
    return file_path

# Function to convert a PDF page to an image
def convert_pdf_page_to_image(pdf, page_index):
    return pdf.SaveAsImage(page_index)

# Function to recognize text from an image
def recognize_text_from_image(imgName, language, model_path):
    scanner = OcrScanner()
    configure_options = ConfigureOptions()
    configure_options.Language = language
    configure_options.ModelPath = model_path
    scanner.ConfigureDependencies(configure_options)

    scanner.Scan(imgName)
    return scanner.Text.ToString()

# Main function
def extract_text():
    pdf_path = select_pdf()
    if not pdf_path:
        print("No file selected!")
        return

    print(f"Processing PDF: {pdf_path}")

    # Load the selected PDF
    pdf = PdfDocument()
    pdf.LoadFromFile(pdf_path)

    extracted_text = ""

    for page_index in range(pdf.Pages.Count):
        image = convert_pdf_page_to_image(pdf, page_index)
        img_name = f"toImage_{page_index}.png"
        image.Save(img_name)

        # Perform OCR
        recognized_text = recognize_text_from_image(img_name, "English", r"D:\OCR\win-x64")
        extracted_text += f"Page {page_index + 1}:\n{recognized_text}\n\n"

    # Save to a text file
    with open("ScannedPDF.txt", "w", encoding="utf-8") as writer:
        writer.write(extracted_text)

    print('Text successfully saved to "ScannedPDF.txt".')

# Run the script
if __name__ == "__main__":
    extract_text()
