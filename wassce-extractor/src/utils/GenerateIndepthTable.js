import { useState } from "react";
import { CountGrade } from "./gradeAnalysis";

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
          <div style={{borderBottom: "1px solid blue"}}>

          </div>
        </div>
        
      )}
    </>
  );
}
