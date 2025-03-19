import React, { useState } from "react";
import UploadPDF from "./components/UploadPDF";
import { GetSpecificGradeCounts, countGradesPerStudent } from "./utils/gradeCalculator";
import { CountGrade } from "./utils/gradeAnalysis"
import Footer from "./components/Footer"      
import StudentSearch from "./utils/StudentSearch"      
import SearchSingleStudent from "./utils/SearchSingleStudent";
import GenerateBySubject from "./utils/GenerateBySubject"
import GenerateOnlySubject from './utils/GenerateOnlySubject'
import GenerateTable from './utils/GenerateTable'
import GenerateIndepthTable from './utils/GenerateIndepthTable'
import GenerateCoreSubject from './utils/GenerateCoreSubject'

export default function App() {  
  const [studentsData, setStudentsData] = useState([]);

  
  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
          Upload PDFs to Extract Student Data
        </h1>
        
        {/* First File Upload */}
        <h3>Upload First PDF</h3>
        {<UploadPDF setStudentsData={setStudentsData} />}

        {/* Second File Upload */}
        <h3>Upload Second PDF</h3>
        <UploadPDF setStudentsData={setStudentsData} />
      </div>   
      <div>
        <GenerateTable studentsData={studentsData} />
        <GenerateIndepthTable studentsData={studentsData} />
        <GenerateCoreSubject studentsData={studentsData} />
        <StudentSearch studentsData={studentsData} />
        <SearchSingleStudent studentsData={studentsData} />
        <GenerateBySubject studentsData={studentsData} />
        <GenerateOnlySubject studentsData={studentsData} />
      </div>
      <Footer/>
    </>

  );
}
