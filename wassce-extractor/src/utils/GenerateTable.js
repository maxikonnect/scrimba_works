import { useState } from "react";
import { CountGrade } from "./gradeAnalysis";

export default function GenerateTable({ studentsData }) {
  const [results, setResults] = useState(null);

  function HandleSubmit(event) {
    event.preventDefault();
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      alert("No data uploaded");
      return;
    }

    const subjectElements = studentsData.map((data) => data["Subjects"]);
    const subjectNames = [...new Set(subjectElements.flatMap((subjects) => Object.keys(subjects)))];
    const subjects = subjectNames.filter((subject) => /[a-zA-Z]/.test(subject));
    
    console.log(subjects);
    const groupSubjects = subjects.map((subject, index) => CountGrade(studentsData, `${index + 1}`, subject));

    setResults(groupSubjects);
  }

  return (
    <>
      <div>
        <form onSubmit={HandleSubmit}>
          <button type="submit" name="submit">Generate Results Summary</button>
        </form>
      </div>

      <div>
        {results && results.map((sub) => sub.subject + "  ||  ")}
      </div>

      <div>
        {results && (
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
                      return <td key={index}>{total === 0 ? "-" : total}</td>;
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
        )}
      </div>
    </>
  );
}
