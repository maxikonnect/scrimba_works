import { useState } from "react";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable";

export default function GenerateBySubject({ studentsData }) {
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
              matchedSubject: matchedSubject, // Store the exact matched subject name
              grade: student.Subjects[matchedSubject], // Get the correct grade
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

  function GeneratePDF(studentsData){
    if(!Array.isArray(studentsData) || studentsData.length === 0){
      alert("No data is available to process")
      return;
    }

    const doc = new jsPDF();
    doc.text(`Search results for students who offer ${subjectName}`, 10, 10);

    const tableColumn = ['Index', 'Name', 'Gender', 'Subjects']
    const tableRows = []

    studentsData.forEach((student) =>{
      const subjects = Object.entries(student.Subjects)
      .map(([subject, value]) => `${subject} : ${value}`)
      .join(", ")
      tableRows.push([student.Index, student.Name, student.Gender, subjects])
    })
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    })
    doc.save(`${subjectName}'s Students`);

  }
  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label htmlFor="subjectName">Enter Subject Name:</label>
        <input
          id="subjectName"
          name="subjectName"
          type="text"
          placeholder="Physics, Chemistry, French..."
          required
        />
        <button type="submit">Submit</button>
      </form>
      
      {results.length > 0 ? (
      <>
        <table>
            <caption>Students Taking {results[0].matchedSubject}: {results.length} Students</caption>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Index</th>
              <th>Gender</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {results.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.Name}</td>
                <td>{student.Index}</td>
                <td>{student.Gender}</td>
                <td>
                  {Object.entries(student.Subjects).map(([subject, grade]) => (
                    <div key={subject}>
                      {subject}: {grade}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={()=>GeneratePDF(results)}>Download PDF</button>
      </>
      ) : subjectName ? (
        <p>No students found for "{subjectName}".</p>
      ) : null}
    </div>
  );
}
