import { useState } from "react";
import { CountGrade } from "./gradeAnalysis";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"

export default function GenerateTable({ studentsData }) {
  const [results, setResults] = useState(null);
  const [showTable, setShowTable] = useState(false); // State for toggling table

  function handleSubmit(event) {
    event.preventDefault();
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      alert("No data uploaded");
      return;
    }


    const subjectElements = studentsData.map((data) => data["Subjects"]);
    const subjectNames = [...new Set(subjectElements.flatMap((subjects) => Object.keys(subjects)))];
    const subjects = subjectNames.filter((subject) => /[a-zA-Z]/.test(subject));

    const groupSubjects = subjects.map((subject, index) => CountGrade(studentsData, `${index + 1}`, subject));

    setResults(groupSubjects);
    setShowTable(!showTable); // ✅ Toggle table visibility
  }
  console.log(results);
  function GeneratePdf(resultsData) {
    if (!Array.isArray(resultsData) || resultsData.length === 0) {
      alert("No data available for export");
      return;
    }
  
    // Create PDF in landscape mode
    const doc = new jsPDF({ orientation: "landscape" });
  
    doc.text("Students In-Depth Analysis", 14, 10);
  
    const tableColumn = [
      "Subject",
      "Total Male",
      "Total Female",
      "A1(M)",
      "A1(F)",
      "B2(M)",
      "B2(F)",
      "B3(M)",
      "B3(F)",
      "C4(M)",
      "C4(F)",
      "C5(M)",
      "C5(F)",
      "C6(M)",
      "C6(F)",
      "D7(M)",
      "D7(F)",
      "E8(M)",
      "E8(F)",
      "F9(M)",
      "F9(F)",
    ];
  
    const tableRows = resultsData.map((subjectData) => {
      const gradesData = subjectData.grade
        .filter((studentGrade) => studentGrade.resultsCame)
        .flatMap((getGrade) => [getGrade.male, getGrade.female]);
  
      return [subjectData.subject, subjectData.totalStudents.Male, subjectData.totalStudents.Female, ...gradesData];
    });
  
    autoTable(doc, {
      startY: 20,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 8, cellWidth: "auto" }, 
      headStyles: { fillColor: [0, 128, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },          
      margin: { top: 15, left: 10, right: 10 }, 
      tableWidth: "auto", 
    });
  
    doc.save("in-depth_analysis.pdf");
  }
  

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit" className="btn">
            {showTable ? "Hide Detailed Results Table" : "Generate Full Detailed Results"}
          </button>
        </form>
      </div>

      {showTable && results && (
        <div>
          <table className="table">
            <caption>WASSCE Results Analysis</caption>
            <thead>
              <tr>
                <th>Subject</th>
                <th colSpan="8"></th>
                <th colSpan="18">Grades</th>
              </tr>
              <tr>
                <td></td>
                <td colSpan="2">Total Candidates Registered</td>
                <td colSpan="2">Total Number Cancelled</td>
                <td colSpan="2">Total Number Absent</td>
                <td colSpan="2">Results Held</td>
                <td colSpan="2">A1</td>
                <td colSpan="2">B2</td>
                <td colSpan="2">B3</td>
                <td colSpan="2">C4</td>
                <td colSpan="2">C5</td>
                <td colSpan="2">C6</td>
                <td colSpan="2">D7</td>
                <td colSpan="2">E8</td>
                <td colSpan="2">F9</td>
              </tr>
              <tr>
                <td></td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
                <td>M</td>
                <td>F</td>
              </tr>
            </thead>
            <tbody>
              {results.map((subjectData) => (
                <tr key={subjectData.subject}>
                  <td>{subjectData.subject}</td>
                  <td>{subjectData.totalStudents.Male}</td>
                  <td>{subjectData.totalStudents.Female}</td>
                  {subjectData.grade
                    .filter((studentGrade) => !studentGrade.resultsCame)
                    .map((getGrade) => (
                      <>
                        <td>{getGrade.male}</td>
                        <td>{getGrade.female}</td>
                      </>
                    ))}
                  {subjectData.grade
                    .filter((studentGrade) => studentGrade.resultsCame)
                    .map((getGrade) => (
                      <>
                        <td>{getGrade.male}</td>
                        <td>{getGrade.female}</td>
                      </>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="medium-btn" onClick={() => GeneratePdf(results)}>Download PDF</button>
          <div>

          </div>
        </div>
        
      )}
    </>
  );
}
