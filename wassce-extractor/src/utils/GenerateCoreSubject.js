import { useState } from "react";
import { CountGrade } from "./gradeAnalysis";


export default function GenerateTable({ studentsData }) {
  const [results, setResults] = useState(null);
  const [showTable, setShowTable] = useState(false);

  function HandleSubmit(event) {
    event.preventDefault();
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
      alert("No data uploaded");
      return;
    }

    // Extract subject names
    const subjectNames = [
      ...new Set(
        studentsData
          .map((data) => data["Subjects"])
          .flatMap((subjects) => Object.keys(subjects))
      ),
    ];

    // Filter core subjects
    const coreSubjects = subjectNames.filter((sub) =>
      ["SCIENCE", "SOCIAL", "CORE", "INTEGRATED", "LANG", "ENGLISH "].some(
        (keyword) => sub.toUpperCase().includes(keyword)
      )
    );

  

    // Process grades for each core subject
    const groupSubjects = coreSubjects.map((subject, index) =>
      CountGrade(studentsData, `${index + 1}`, subject)
    );

    setResults(groupSubjects);
    setShowTable(!showTable);
    console.log(groupSubjects)
  }

  return (
    <>
      <div>
        <form onSubmit={HandleSubmit}>
          <button type="submit" className="btn">
            {showTable ? "Hide Core Subjects Table" : "Generate Only Core Subjects"}</button>
        </form>
      </div>
      <div>
        {showTable && results && results.length > 0 ? (
          <table className="table">
            <caption>CORE SUBJECTS PERCENTAGE PASSES</caption>
            <thead>
              <tr>
                <th>Subject</th>
                <th>A1</th>
                <th>%Pass</th>
                <th>B2</th>
                <th>%Pass</th>
                <th>B3</th>
                <th>%Pass</th>
                <th>C4</th>
                <th>%Pass</th>
                <th>C5</th>
                <th>%Pass</th>
                <th>C6</th>
                <th>%Pass</th>
                <th>D7</th>
                <th>%Pass</th>
                <th>E8</th>
                <th>%Pass</th>
                <th>F9</th>
                <th>%Fail</th>
                <th>Total Candidates Registered</th>
                <th>Overall % Pass</th>
                <th>Candidates with Results</th>
                <th>Total Cancelled</th>
                <th>Total Absent</th>
                <th>Results Held</th>
              </tr>
            </thead>
            <tbody>
              {results.map((subjectData, index) => {
                const totalRegistered = subjectData.totalStudents?.Total || 0;

                // Calculate the total number of students whose results came
                const totalResultsCame = subjectData.grade
                  .filter((grade) => grade.resultsCame === true)
                  .reduce((sum, grade) => sum + grade.male + grade.female, 0);
                const StuPassed = subjectData.grade
                  .filter((grade) => grade.hasPassed === true)
                  .reduce((sum, grade) => sum + grade.male + grade.female, 0)
                return (
                    <>
                    <tr key={index}>
                      <td>{subjectData.subject}</td>
                      {subjectData.grade
                        .filter((grade) => grade.resultsCame === true)
                        .map((grade, idx) => {
                          const total = grade.male + grade.female;
                          return(
                              <>
                                  <td key={idx}>{total || "0"}</td>
                                  <td>{((total / totalResultsCame) * 100).toFixed(2)}</td>
                              </>
                          )
                        })}
                      <td>{totalRegistered}</td>
                      <td>{((StuPassed/totalResultsCame) * 100).toFixed(2)}</td>
                      <td>{totalResultsCame}</td>
                      
                      {subjectData.grade
                      .filter((grade) => grade.resultsCame === false)
                      .map((grade, idx) => {
                          const total = grade.male + grade.female;
                          return(
                              <td>{total || 0}</td>
                          )
                      }
                      )}
                    </tr>
                    <tr>
                    
                    </tr>
                </>
                );
              })}
            </tbody>
            <tfoot>
                
            </tfoot>
          </table>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
