import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

export default function SearchSingleStudent({ studentsData }) {
  const [results, setResults] = useState(null);
  const [name, setName] = useState("");

  function SearchStudent(studentsData, name) {
    try {
      if (!Array.isArray(studentsData)) {
        return "No data uploaded yet";
      }

      const searchWords = name.toLowerCase().trim().split(/\s+/);

      const retrievedData = studentsData.filter((student) => {
        const studentName = student.Name.toLowerCase();
        return searchWords.every((word) => studentName.includes(word));
      });

      return retrievedData.length > 0 ? retrievedData : "No Student With that Name";
    } catch (e) {
      return e.message;
    }
  }

  function HandleSearch(event) {
    event.preventDefault();
    const formEl = new FormData(event.target);
    const name = formEl.get("name")?.trim();

    if (!name) {
      setResults("Please enter a student name.");
      return;
    }

    const searched = SearchStudent(studentsData, name);
    setResults(searched);
    setName(name);
  }

  function generatePDF(studentsData) {
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      alert("No data available to generate PDF.");
      return;
    }

    const doc = new jsPDF();
    doc.text(`Student Search Results Containing the word ${name}`, 10, 10);

    const tableColumn = ["Index", "Name", "Gender", "Subjects"];
    const tableRows = [];

    studentsData.forEach((student) => {
      const subjects = Object.entries(student.Subjects)
        .map(([subject, grade]) => `${subject}: ${grade}`)
        .join(", ");
      tableRows.push([student.Index, student.Name, student.Gender, subjects]);
    });

    // ✅ Correct usage of autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("students_data.pdf");
  }

  return (
    <div className="result-checker">
      <header>
        <hr />
        <h3>ENTER STUDENT'S NAME TO SEARCH</h3>
      </header>
      <form onSubmit={HandleSearch}>
          <div className="form-container">
            <label htmlFor="name">
              Enter Student's Name:
              <input type="text" id="name" name="name" placeholder="Michael, Cindy, Adwoa" required />
            </label>
            <button type="submit" className="small-btn">Submit</button>
          </div>
      </form>

      {Array.isArray(results) ? (
        <>
          <table>
            <caption>Searched Results containing "{name}". Returned {" "}
              {results.length > 0 ? results.length : " no "}
              {results.length > 1 ? " results" : " result"}
            </caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Index</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Subjects</th>
              </tr>
            </thead>
            <tbody>
              {results.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.Index}</td>
                  <td>{student.Name}</td>
                  <td>{student.Gender}</td>
                  <td>
                    {Object.entries(student.Subjects).map(([subject, grade]) => (
                      <div key={subject}>{subject}: {grade}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="medium-btn" onClick={() => generatePDF(results)}>Download PDF</button>
        </>
      ) : results ? (
        <p>{results}</p>
      ) : null}
    </div>
  );
}
