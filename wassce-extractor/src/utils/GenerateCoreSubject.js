import { useState } from "react";
import { CountGrade } from "./gradeAnalysis";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import React from 'react';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);


export default function GenerateTable({ studentsData }) {
  const [results, setResults] = useState(null);
  const [showTable, setShowTable] = useState(false);

  function HandleSubmit(event) {
    event.preventDefault();
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      alert("No data uploaded");
      return;
    }

    // Extract subject names
    const subjectNames = [
      ...new Set(
        studentsData
          .map((data) => data["Subjects"])
          .flatMap((subjects) => Object.keys(subjects))
      ),
    ];

    // Filter core subjects
    const coreSubjects = subjectNames.filter((sub) =>
      ["SCIENCE", "SOCIAL", "CORE", "INTEGRATED", "LANG", "ENGLISH "].some(
        (keyword) => sub.toUpperCase().includes(keyword)
      )
    );

  

    // Process grades for each core subject
    const groupSubjects = coreSubjects.map((subject, index) =>
      CountGrade(studentsData, `${index + 1}`, subject)
    );

    setResults(groupSubjects);
    setShowTable(!showTable);
  }

  
  function GeneratePDF(results) {
    if (!Array.isArray(results) || results.length === 0) {
      alert("No data available for export");
      return;
    }
  
    // Create PDF in landscape mode
    const doc = new jsPDF({ orientation: "landscape" });
  
    doc.text(`Core Subjects Analysis  
          \n TCR = Total Candidates Registered \t O % P = Overall % Pass
          \n CWR = Candidates with Results \t TC = Total cancelled
          \n  TA = Total Absent  RH = Results Held`, 14, 10);
  
    const tableColumn = [
      "Subject",
      "A1",
      "% Pass",
      "B2",
      "% Pass",
      "B3",
      "% Pass",
      "C4",
      "% Pass",
      "C5",
      "% Pass",
      "C6",
      "% Pass",
      "D7",
      "% Pass",
      "E8",
      "% Pass",
      "F9",
      "% Fail",
      "TCR",
      "O % P",
      "CWR",
      "TC",
      "TA",
      "RH"
    ];
  
    const tableRows = results.map((subjectData) => {
      const gradesData = subjectData.grade
        .filter((grade) => grade.resultsCame)
        .flatMap((grade) => [
          grade.male + grade.female || 0,
          ((grade.male + grade.female) / (subjectData.totalStudents?.Total || 1) * 100).toFixed(2) || "0"
        ]);
  
      const totalRegistered = subjectData.totalStudents?.Total || 0;
      const totalResultsCame = subjectData.grade
        .filter((grade) => grade.resultsCame === true)
        .reduce((sum, grade) => sum + grade.male + grade.female, 0);
      const studentsPassed = subjectData.grade
        .filter((grade) => grade.hasPassed === true)
        .reduce((sum, grade) => sum + grade.male + grade.female, 0);
  
      const overallPassPercentage = ((studentsPassed / totalResultsCame) * 100).toFixed(2) || "0";
  
      const nonResultsData = subjectData.grade
        .filter((grade) => grade.resultsCame === false)
        .flatMap((grade) => [grade.male + grade.female || 0]);
  
      return [
        subjectData.subject,
        ...gradesData,
        totalRegistered,
        overallPassPercentage,
        totalResultsCame,
        ...nonResultsData
      ];
    });
  
    autoTable(doc, {
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 8, cellWidth: "wrap" },
      headStyles: { fillColor: [0, 128, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 40, left: 10, right: 10 }
    });
  
    doc.save("core_subjects_report.pdf");
  }
  
  return (
    <>
      <div>
        <form onSubmit={HandleSubmit}>
          <button type="submit" className="btn">
            {showTable ? "Hide Core Subjects Table" : "Generate Only Core Subjects"}</button>
        </form>
      </div>
      <div>
        {showTable && results && results.length > 0 ? (
          <table className="core-table">
            <caption>CORE SUBJECTS PERCENTAGE PASSES</caption>
            <thead>
              <tr>
                <th>Subject</th>
                <th>A1</th>
                <th>%Pass</th>
                <th>B2</th>
                <th>%Pass</th>
                <th>B3</th>
                <th>%Pass</th>
                <th>C4</th>
                <th>%Pass</th>
                <th>C5</th>
                <th>%Pass</th>
                <th>C6</th>
                <th>%Pass</th>
                <th>D7</th>
                <th>%Pass</th>
                <th>E8</th>
                <th>%Pass</th>
                <th>F9</th>
                <th>%Fail</th>
              </tr>
            </thead>
            <tbody>
              {results.map((subjectData, index) => {
                

                // Calculate the total number of students whose results came
                const totalResultsCame = subjectData.grade
                  .filter((grade) => grade.resultsCame === true)
                  .reduce((sum, grade) => sum + grade.male + grade.female, 0);
                return (
                    <>
                    <tr key={index}>
                      <td>{subjectData.subject}</td>
                      {subjectData.grade
                        .filter((grade) => grade.resultsCame === true)
                        .map((grade, idx) => {
                          const total = grade.male + grade.female;
                          return(
                              <>
                                  <td key={idx}>{total || "0"}</td>
                                  <td>{((total / totalResultsCame) * 100).toFixed(2)}</td>
                              </>
                          )
                        })}
                      
                    </tr>
                    <tr>
                    
                    </tr>
                </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p></p>
        )}
      </div>
      <div>
        
        {showTable && results && results.length > 0 ? (
          <>
          <table className="core-table">
            <caption>CORE SUBJECTS PERCENTAGE PASSES</caption>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total Candidates Registered</th>
                <th>Overall % Pass</th>
                <th>Candidates with Results</th>
                <th>Total Cancelled</th>
                <th>Total Absent</th>
                <th>Results Held</th>
              </tr>
            </thead>
            <tbody>
              {results.map((subjectData, index) => {
                const totalRegistered = subjectData.totalStudents?.Total || 0;

                // Calculate the total number of students whose results came
                const totalResultsCame = subjectData.grade
                  .filter((grade) => grade.resultsCame === true)
                  .reduce((sum, grade) => sum + grade.male + grade.female, 0);
                const StuPassed = subjectData.grade
                  .filter((grade) => grade.hasPassed === true)
                  .reduce((sum, grade) => sum + grade.male + grade.female, 0)
                return (
                    <>
                    <tr key={index}>
                      <td>{subjectData.subject}</td>
                      <td>{totalRegistered}</td>
                      <td>{((StuPassed/totalResultsCame) * 100).toFixed(2)}</td>
                      <td>{totalResultsCame}</td>
                      
                      {subjectData.grade
                      .filter((grade) => grade.resultsCame === false)
                      .map((grade, idx) => {
                          const total = grade.male + grade.female;
                          return(
                              <td>{total || 0}</td>
                          )
                      }
                      )}
                    </tr>
                    <tr>
                    
                    </tr>
                </>
                );
              })}
            </tbody>
          </table>
          <button className="medium-btn" onClick={() => GeneratePDF(results)}>Download PdF</button>
        </>
        ) : (
          <p></p>
        )}
        
      </div>
      
    </>
  );
}
