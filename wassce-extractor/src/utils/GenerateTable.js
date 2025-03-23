import { useState } from "react";
import { CountGrade } from "./gradeAnalysis";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function GenerateTable({ studentsData }) {
  const [results, setResults] = useState(null);
  const [showTable, setShowTable] = useState(false);

  function HandleSubmit(event) {
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
    setShowTable(!showTable);
  }

  function GeneratePDF() {
    if (!results || results.length === 0) {
      alert("No data available to generate PDF");
      return;
    }

    const doc = new jsPDF();
    doc.text("WASSCE Results Analysis", 10, 10);

    const tableColumn = [
      "Subject", "A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9", "Pass %", "Total Candidates"
    ];
    const tableRows = [];

    results.forEach((subjectData) => {
      const rowData = [
        subjectData.subject,
        ...subjectData.grade
          .filter((studentGrade) => studentGrade.resultsCame)
          .map((getGrade) => getGrade.male + getGrade.female || "-"),
        (
          (subjectData.grade
            .filter((studentGrade) => studentGrade.hasPassed)
            .reduce((total, acc) => total + acc.male + acc.female, 0) /
            subjectData.grade
              .filter((studentGrade) => studentGrade.resultsCame)
              .reduce((total, acc) => total + acc.male + acc.female, 0)) *
          100
        ).toFixed(2),
        subjectData.grade
          .filter((studentGrade) => studentGrade.resultsCame)
          .reduce((total, acc) => total + acc.male + acc.female, 0),
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("WASSCE_Results_Analysis.pdf");
  }

  return (
    <div className="generateTable">
      <div className="generateForm">
        <form onSubmit={HandleSubmit}>
          <button type="submit" className="btn">
            {showTable ? "Hide Summary Results Table" : "Generate Results Summary"}
          </button>
        </form>
      </div>

      {showTable && results && (
        <div className="table-container">
          <table className="table">
            <caption>WASSCE Results Analysis</caption>
            <thead>
              <tr>
                <th>Subject</th>
                <th colSpan="9">Grades</th>
                <th>Percentage Pass (A1-C6)</th>
                <th>Total Number of Candidates</th>
              </tr>
              <tr>
                <td></td>
                <td>A1</td>
                <td>B2</td>
                <td>B3</td>
                <td>C4</td>
                <td>C5</td>
                <td>C6</td>
                <td>D7</td>
                <td>E8</td>
                <td>F9</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {results.map((subjectData) => (
                <tr key={subjectData.subject}>
                  <td>{subjectData.subject}</td>
                  {subjectData.grade
                    .filter((studentGrade) => studentGrade.resultsCame)
                    .map((getGrade, index) => {
                      const total = getGrade.male + getGrade.female;
                      return <td key={index}>{total === 0 ? 0 : total}</td>;
                    })}
                  <td>
                    {(
                      (subjectData.grade
                        .filter((studentGrade) => studentGrade.hasPassed)
                        .reduce((total, acc) => total + acc.male + acc.female, 0) /
                        subjectData.grade
                          .filter((studentGrade) => studentGrade.resultsCame)
                          .reduce((total, acc) => total + acc.male + acc.female, 0)) *
                      100
                    ).toFixed(2)}
                  </td>
                  <td>
                    {subjectData.grade
                      .filter((studentGrade) => studentGrade.resultsCame)
                      .reduce((total, acc) => total + acc.male + acc.female, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={GeneratePDF} className="small-btn">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
