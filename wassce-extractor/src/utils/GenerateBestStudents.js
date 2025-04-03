import { useState } from "react";
import bestStudentsCalculator from "./bestStudentsCalculator";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function GenerateBestStudents({ studentsData }) {
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [numStudents, setNumStudents] = useState(""); // Store user input
  const [selectedCourse, setSelectedCourse] = useState("All Subjects"); // Course selection
  const [showTable, setShowTable] = useState(false); // Control table visibility
  const [summary, setSummary] = useState(null); // Store student summary

  function HandleSubmit(event) {
    event.preventDefault();

    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      setErrorMessage("No data to work with");
      return;
    }

    let filteredResults = bestStudentsCalculator(studentsData);
    if (selectedCourse !== "All Subjects") {
      filteredResults = filteredResults.filter(student => student.Course === selectedCourse);
    }

    // Ensure valid number of students
    const limit = parseInt(numStudents, 10);
    if (!isNaN(limit) && limit > 0) {
      filteredResults = filteredResults.slice(0, limit);
    }

    // Generate summary statistics
    const summaryData = {
      totalStudents: filteredResults.length,
      maleCount: filteredResults.filter((s) => s.Gender.toLowerCase() === "male").length,
      femaleCount: filteredResults.filter((s) => s.Gender.toLowerCase() === "female").length,
      courses: {},
    };

    filteredResults.forEach((student) => {
      summaryData.courses[student.Course] = (summaryData.courses[student.Course] || 0) + 1;
    });

    setResults(filteredResults);
    setSummary(summaryData);
    setShowTable(true); 
  }

  console.log(results)
  function GeneratePDF(results) {
    if (!Array.isArray(results) || results.length === 0) {
      setErrorMessage("No PDF uploaded yet");
      return;
    }
  
    const doc = new jsPDF({ orientation: "landscape" });
  
    // Start at Y position 10
    let yPosition = 10;
    const marginLeft = 10;
  
    // Title and summary text
    const summaryText = `Top ${results.length} students out of ${studentsData.length}.
  This result does not include students who got F9, were absent,
  whose results are withheld, or have at least one result cancelled.`;
  
    // Wrap text to prevent overflow
    const wrappedSummary = doc.splitTextToSize(summaryText, 270);
    doc.text(wrappedSummary, marginLeft, yPosition);
    yPosition += wrappedSummary.length * 6 + 10; // More space before next section
  
    if (summary) {
      // Gender summary
      doc.text(`Males: ${summary.maleCount}`, marginLeft, yPosition);
      yPosition += 6;
      doc.text(`Females: ${summary.femaleCount}`, marginLeft, yPosition);
      yPosition += 6;
  
      // Course summary
      doc.text("Students Per Course:", marginLeft, yPosition);
      yPosition += 6;
      Object.entries(summary.courses).forEach(([course, count]) => {
        doc.text(`${course}: ${count} students`, marginLeft + 5, yPosition);
        yPosition += 6;
      });
  
      yPosition += 10; // Extra spacing before the table
    }
  
    // Table setup
    const tableColumn = [
      "Index",
      "Student",
      "Gender",
      "Course",
      "Core Subjects",
      "Elective Subjects",
      "Total Grade",
    ];
  
    const tableRows = results.map((student) => {
      const coreSubjects = Object.entries(student.corePapers)
        .map(([subject, grade]) => `${subject}: ${grade}`)
        .join("\n");
  
      const electiveSubjects = Object.entries(student.electivePapers)
        .map(([subject, grade]) => `${subject}: ${grade}`)
        .join("\n");
  
      return [
        student.Index,
        student.Name,
        student.Gender,
        student.Course,
        coreSubjects,
        electiveSubjects,
        student.TotalGrade,
      ];
    });
  
    autoTable(doc, {
      startY: yPosition,
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
        <p style={{ fontSize: "12px", fontWeight: "bold", color: "green" }}>
          ***This Generates Students Total Grades, excluding students with F9,
          absent students or students with results cancelled. You can specify
          the top number of students to generate by entering a number. For the Core Subjects,
          ENGLISH And MATHEMATICS(CORE) with either CORE SCIENCE or SOCIAL STUDIES AND THREE BEST ELECTIVES***
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
            <div className="search-contain">
              <label htmlFor="courseSelect">Select Course:</label>
              <select id="courseSelect" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="All Subjects">All Subjects</option>
                <option value="SCIENCE">General Science</option>
                <option value="GENERAL ARTS">General Arts</option>
                <option value="BUSINESS">Business</option>
                <option value="VISUAL ARTS">Visual Arts</option>
                <option value="HOME ECONOMICS">Home Economics</option>
              </select>
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
          <div className="summary-container">
          <h3>Summary</h3>
          <p className="info">Total Students: {summary.totalStudents}</p>
          <p className="info">Male Students: {summary.maleCount}</p>
          <p className="info">Female Students: {summary.femaleCount}</p>
          <h4><strong>Students Per Course:</strong></h4>
          <ul>
            {Object.entries(summary.courses).map(([course, count]) => (
              <li key={course} className="info">{course}: {count} students</li>
            ))}
          </ul>
        </div>
          <table className="table">
            <caption>
              Returned Top {results.length} students out of {studentsData.length}
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
