import { useState } from "react";
import { CountGrade } from "./gradeAnalysis";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function GenerateTable({ studentsData }) {
  const [results, setResults] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function HandleSubmit(event) {
    event.preventDefault();
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      setErrorMessage("Kindly Upload pdf Data");
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
      setErrorMessage("No data available to generate PDF");
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

  function ExportToExcel() {
    if (!Array.isArray(results) || results.length === 0) {
      setErrorMessage("No data available to generate Excel");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      results.map((subjectData) => ({
        Subject: subjectData.subject,
        A1: subjectData.grade[0]?.male + subjectData.grade[0]?.female || 0,
        B2: subjectData.grade[1]?.male + subjectData.grade[1]?.female || 0,
        B3: subjectData.grade[2]?.male + subjectData.grade[2]?.female || 0,
        C4: subjectData.grade[3]?.male + subjectData.grade[3]?.female || 0,
        C5: subjectData.grade[4]?.male + subjectData.grade[4]?.female || 0,
        C6: subjectData.grade[5]?.male + subjectData.grade[5]?.female || 0,
        D7: subjectData.grade[6]?.male + subjectData.grade[6]?.female || 0,
        E8: subjectData.grade[7]?.male + subjectData.grade[7]?.female || 0,
        F9: subjectData.grade[8]?.male + subjectData.grade[8]?.female || 0,
        "Percentage Pass": (
          (subjectData.grade
            .filter((studentGrade) => studentGrade.hasPassed)
            .reduce((total, acc) => total + acc.male + acc.female, 0) /
            subjectData.grade
              .filter((studentGrade) => studentGrade.resultsCame)
              .reduce((total, acc) => total + acc.male + acc.female, 0)) *
          100
        ).toFixed(2),
        "Total Candidates": subjectData.grade
          .filter((studentGrade) => studentGrade.resultsCame)
          .reduce((total, acc) => total + acc.male + acc.female, 0),
      }))
    );

    worksheet["!cols"]=[
      { wch: 22 }, // Subject column width
      { wch: 6 },  // A1
      { wch: 6 },  // B2
      { wch: 6 },  // B3
      { wch: 6 },  // C4
      { wch: 6 },  // C5
      { wch: 6 },  // C6
      { wch: 6 },  // D7
      { wch: 6 },  // E8
      { wch: 6 },  // F9
      { wch: 15 }, // Percentage Pass
      { wch: 15 }, // Total Candidates
    ]

    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "WASSCE Results");
    XLSX.writeFile(workbook, "WASSCE_Results_Analysis.xlsx");
  }

  return (
    <div className="generateTable">
      <div className="generateForm">
        <form onSubmit={HandleSubmit}>
          <button type="submit" className="generatebtn">
            {showTable ? "Hide Summary Results Table" : "Generate Results Summary"}
          </button>
        </form>
        {!results ? <p className="error-message">{errorMessage}</p> : ""}
      </div>

      {showTable && results && (
        <div className="table-container" style={{ overflowX: "auto" }}>
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
          <button onClick={GeneratePDF} className="medium-btn">
            Download PDF
          </button>
          <button onClick={ExportToExcel} className="medium-btn">
            Download Excel
          </button>
        </div>
      )}
    </div>
  );
}
