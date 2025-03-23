import { useState } from "react";
import { GetSpecificGradeCounts } from "./gradeCalculator";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SpecificGradeMultipleTimes = ({ studentsData }) => {
  const [results, setResults] = useState(null);
  const [countGrade, setCountGrade] = useState("");
  const [numberOfTimes, setNumberOfTimes] = useState("");

  function Search(event) {
    event.preventDefault(); 

    if(!Array.isArray(studentsData) || studentsData.length === 0){
      alert("No Data uploaded. Kindly upload");
      return;
    }
    const formData = new FormData(event.target);
    const grade = formData.get("countGrade").toUpperCase().trim();
    const times = formData.get("numberOfTimes").trim();

    if (!grade || !times || isNaN(times) || times <= 0) {
      alert("Please enter a valid grade and number of times.");
      return;
    }

    setCountGrade(grade);
    setNumberOfTimes(times);

    const filteredStudents = GetSpecificGradeCounts(studentsData, grade, times);
    setResults(filteredStudents);
  }

  function GeneratePDF(studentsData) {
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      alert("No data available to generate PDF");
      return;
    }

    let doc = new jsPDF();
    doc.text("Students Search Result", 10, 10);

    const tableColumn = ["Index", "Name", "Gender", "Subjects"];
    const tableRows = [];

    studentsData.forEach((student) => {
      const subjects = Object.entries(student.Subjects)
        .map(([subject, grade]) => `${subject}: ${grade}`)
        .join(", ");
      tableRows.push([student.Index, student.Name, student.Gender, subjects]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Students_Grade_count.pdf");
  }

  return (
    <div className="result-checker">
      <form onSubmit={Search}>
        <h3>Find Students Who Got A Specific Grade Multiple Times.</h3>
            <div className="form-container">
              <div className="search-contain">
                <label htmlFor="countGrade">Enter Grade:</label>
                <input
                  type="text"
                  id="countGrade"
                  name="countGrade"
                  placeholder="Enter A1, B2, B3, C4, C5, C6, D7, E8, F9"
                  required
                />
              </div>
              <div className="search-contain">
                <label htmlFor="numberOfTimes">Number of times:</label>
                <input type="number" id="numberOfTimes" name="numberOfTimes" required />
              </div>
              <div className="search-contain">
                <button type="submit" className="small-btn">Submit</button>
              </div>
          </div>
      </form>

      {Array.isArray(results) ? (
        <>
            <table>
              <caption>
                {results.length} {results.length === 1 ? "Student" : "Students"}{" "}
                got <strong>At least</strong> {numberOfTimes} {countGrade}'s
              </caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Results</th>
                </tr>
              </thead>
              <tbody>
                {results.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{student.Index}</td>
                    <td>{student.Name}</td>
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
            <button className="medium-btn" onClick={() => GeneratePDF(results)}>Download PDF</button>
        </>
      ) : results ? (
        <p>{results}</p>
      ) : null}
    </div>
  );
};

export default SpecificGradeMultipleTimes;
