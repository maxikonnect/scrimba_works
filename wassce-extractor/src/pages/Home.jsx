import React, { useState } from "react";
import UploadPDF from "../components/UploadPDF";
import Footer from "../components/Footer";
import SpecificGradeMultipleTimes from "../utils/specificGradeMultipleTimes";
import SearchSingleStudent from "../utils/SearchSingleStudent";
import GenerateBySubject from "../utils/GenerateBySubject";
import GenerateOnlySubject from "../utils/GenerateOnlySubject";
import GenerateTable from "../utils/GenerateTable";
import GenerateIndepthTable from "../utils/GenerateIndepthTable";
import GenerateCoreSubject from "../utils/GenerateCoreSubject";
import '../styles/reset.css';
import Navbar from '../components/Navbar';
import Subjects from '../components/subjects';
import GenerateBestStudents from "../utils/GenerateBestStudents"

export default function Home() {  
  const [studentsData, setStudentsData] = useState([]);
  const [showText, setShowText] = useState(false);

 

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <div className="sub-container">
            
            <h1 className="containerHeader">
              Upload PDFs to Extract Student Data
            </h1>
            <div className="hideShowContainer">
                {showText && <p className="hideAndShow">
                    For schools with one pdf upload only one.
                    upload <strong>two Pdf's</strong> if you have two PDF's
                </p>}
                <button  onClick={()=>setShowText(!showText)}>
                  {showText ? "Click To Hide Hint" :  "Click To Read Hint"}
                </button>
            </div>
            <div className="uploadContainer">
                
                <div className="upload-sub">
                  <h3>Upload First PDF</h3>
                  <UploadPDF  className="uploader" setStudentsData={setStudentsData} />
                </div>      
                <div className="upload-sub">
                  <h3>Upload Second PDF</h3>
                  <UploadPDF  className="uploader" setStudentsData={setStudentsData} />
                </div> 
            </div>
      

            {/* Rendering Components Instead of Routes */}
              
              <GenerateTable studentsData={studentsData} />
              <GenerateIndepthTable studentsData={studentsData} />
              <GenerateCoreSubject studentsData={studentsData} />
              <GenerateBestStudents studentsData={studentsData} />
              
            <div className="detailedResults">
              <SpecificGradeMultipleTimes studentsData={studentsData} />
              <SearchSingleStudent studentsData={studentsData} />
              
              <Subjects studentsData={studentsData}/>
              <hr style={{borderBottom: "1px solid #0074a7"}}/>
              <GenerateBySubject studentsData={studentsData} />
              <GenerateOnlySubject studentsData={studentsData} />
            </div>
        </div>
      </main>

      <Footer  className="footer"/>
    </>
  );
}
