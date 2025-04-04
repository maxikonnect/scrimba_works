import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function GenerateOnlySubject({ studentsData }) {
  const [results, setResults] = useState([]);
  const [subjectName, setSubjectName] = useState("");

  function subjectSearch(studentsData, subject) {
    try {
      if (!Array.isArray(studentsData) || studentsData.length === 0) {
        throw new Error("No data is available");
      }

      if (!subject) {
        throw new Error("Please enter a subject name.");
      }

      const searchWords = subject.toLowerCase().trim().split(/\s+/);

      const filteredStudents = studentsData
        .map((student) => {
          const studentSubjects = Object.keys(student.Subjects);
          const matchedSubject = studentSubjects.find((s) =>
            searchWords.every((word) => s.toLowerCase().includes(word))
          );

          if (matchedSubject) {
            return {
              ...student,
              matchedSubject: matchedSubject, // ✅ Store the matched subject name
              grade: student.Subjects[matchedSubject], // ✅ Store the correct grade
            };
          }

          return null;
        })
        .filter((student) => student !== null);

      return filteredStudents.length > 0 ? filteredStudents : [];
    } catch (e) {
      console.error("Error:", e.message);
      return [];
    }
  }

  function HandleSubmit(event) {
    event.preventDefault();
    const formEl = new FormData(event.target);
    const enteredSubject = formEl.get("subjectName")?.trim().toUpperCase();

    const subjectResult = subjectSearch(studentsData, enteredSubject);
    setResults(subjectResult);
    setSubjectName(enteredSubject);
  }

  function GeneratePDF(studentsData, subjectName) {
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      alert("No data has been uploaded");
      return;
    }

    let doc = new jsPDF();
    doc.setFontSize(20)
    doc.text(`${subjectName} WASSCE Results`, 10, 10);

    const tableColumn = ["Index", "Name", "Gender", "Grade"];
    const tableRows = [];

    studentsData.forEach((student) => {
      tableRows.push([
        student.Index,
        student.Name,
        student.Gender,
        student.grade || "Not Available", 
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${subjectName}_Search_Results.pdf`);
  }

  return (
    <div className="generateTable">
      <h3>GET PARTICULAR SUBJECT RESULTS OF STUDENT</h3>
      <div>
      <form onSubmit={HandleSubmit}>
          <div className="form-container">
            <div className="search-contain">
              <label htmlFor="subjectName">Enter Subject Name:</label>
              <input
                id="subjectName"
                name="subjectName"
                type="text"
                placeholder="Physics, Chemistry, French..."
                required
              />
            </div>
            <div>
              <button type="submit" className="small-btn">Submit</button>
            </div>
          </div>
      </form>
      </div>

      {results.length > 0 ? (
        <>
          <div className="table-container" style={{overflowX: "auto"}}>
          <table>
            <caption>
              Students Taking {results[0].matchedSubject}: {results.length} Students
            </caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Index</th>
                <th>Gender</th>
                <th>{results[0].matchedSubject} Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.Name}</td>
                  <td>{student.Index}</td>
                  <td>{student.Gender}</td>
                  <td>{student.grade || "Not Available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="medium-btn" onClick={() => GeneratePDF(results, subjectName)}>Download PDF</button>
          </div>
        </>
      ) : subjectName ? (
        <p className="error-message">No students found for "{subjectName}".</p>
      ) : null}
    </div>
  );
}
