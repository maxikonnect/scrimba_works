import { useState } from "react";
import bestStudentsCalculator from "./bestStudentsCalculator";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function GenerateBestStudents({ studentsData }) {
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [numStudents, setNumStudents] = useState(""); // Store user input
  const [showTable, setShowTable] = useState(false); // Control table visibility

  function HandleSubmit(event) {
    event.preventDefault();

    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      setErrorMessage("No data to work with");
      return;
    }

    let filteredResults = bestStudentsCalculator(studentsData);

    // Ensure valid number of students
    const limit = parseInt(numStudents, 10);
    if (!isNaN(limit) && limit > 0) {
      filteredResults = filteredResults.slice(0, limit);
    }

    setResults(filteredResults);
    setShowTable(true); 
  }

  function GeneratePDF(results) {
    if (!Array.isArray(results) || results.length === 0) {
      setErrorMessage("No PDF uploaded yet");
      return;
    }

    const doc = new jsPDF({ orientation: "landscape" });
    doc.text(
      `Returned ${results.length} students out of ${studentsData.length}
      This result does not include students who got F9, who were absent,
      whose results are withheld, or have at least one result cancelled.`,
      10,
      10
    );

    const tableColumn = [
      "Index",
      "Student",
      "Gender",
      "Core Subjects",
      "Elective Subjects",
      "Total Grade",
    ];

    const tableRows = results.map((student) => {
      const core_subjects = Object.entries(student.corePapers)
        .map(([subject, grade]) => `${subject}: ${grade}`)
        .join("\n");

      const elective_subjects = Object.entries(student.electivePapers)
        .map(([subject, grade]) => `${subject}: ${grade}`)
        .join("\n");

      return [
        student.Index,
        student.Name,
        student.Gender,
        core_subjects,
        elective_subjects,
        student.TotalGrade,
      ];
    });

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 8, cellWidth: "wrap" },
      headStyles: { fillColor: [0, 128, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 20, left: 10, right: 10 },
      didDrawPage: function (data) {
        doc.text(
          `Page ${doc.internal.getNumberOfPages()}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
      pageBreak: "auto",
    });

    doc.save("Best_Students.pdf");
  }

  return (
    <div className="generateTable">
      <hr />
      <div>
        <p style={{fontSize: "12px", fontWeight: "bold", color: "green"}}>
            ***This Generates Students Total Grades, excluding students with F9,
            Absent students or students with results cancelled.

            You can specify the top number of students to generate by entering
            a number***
        </p>
        <form onSubmit={HandleSubmit}>
        <div className="form-container">
            <div className="search-contain">
                <label htmlFor="subjectName">Number of Students to Display:</label>
                <input
                  type="number"
                  value={numStudents}
                  onChange={(e) => setNumStudents(e.target.value)}
                  min="1"
                  max={studentsData.length}
                  placeholder="Enter number"
                />
            </div>
            <button type="submit" className="generatebtn">
              Show Best Students
            </button>
            </div>
        </form>
      </div>
      {!results ? <p className="error-message">{errorMessage}</p> : ""}
      {showTable && results && (
        <div className="table-container" style={{ overflowX: "auto" }}>
          <table className="table">
            <caption>
              Returned Top {results.length} students out of {studentsData.length}
              <p>
                This result does not include students who got F9, who were
                absent, whose results are withheld, or have at least one result
                cancelled.
              </p>
            </caption>
            <thead>
              <tr>
                <th>Index</th>
                <th>Student</th>
                <th>Gender</th>
                <th>Course Offered</th>
                <th>Core Subjects</th>
                <th>Elective Subjects</th>
                <th>Total Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((student) => (
                <tr key={student.Index}>
                  <td>{student.Index}</td>
                  <td>{student.Name}</td>
                  <td>{student.Gender}</td>
                  <td>{student.Course}</td>
                  <td>
                    {Object.entries(student.corePapers).map(([subject, grade]) => (
                      <p key={subject}>
                        {subject} : {grade}
                      </p>
                    ))}
                  </td>
                  <td>
                    {Object.entries(student.electivePapers).map(([subject, grade]) => (
                      <p key={subject}>
                        {subject} : {grade}
                      </p>
                    ))}
                  </td>
                  <td>{student.TotalGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="medium-btn" onClick={() => GeneratePDF(results)}>
            Download PDF
          </button>
          <button className="medium-btn" onClick={() => setShowTable(false)}>
            Hide Results
          </button>
        </div>
      )}
      <hr />
    </div>
  );
}

