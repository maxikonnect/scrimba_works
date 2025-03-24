import { useState, useEffect } from "react";

export default function Subjects({ studentsData }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (Array.isArray(studentsData) && studentsData.length > 0) {
      const subjectNames = [
        ...new Set(
          studentsData
            .map((data) => data["Subjects"])
            .flatMap((subjects) => Object.keys(subjects))
        ),
      ];
      setResults(subjectNames);
    }
  }, [studentsData]); // Runs whenever studentsData changes

  return (
    <>
      {results.length > 0 ? (
        <div>
          <p>SUBJECTS TO SEARCH WITH: {results.length} Subjects</p>
          {results.map((subject, index) => (
            <span
              key={index}
              style={{ fontSize: "1.5em", color: "rgb(60, 60, 200)" }}
            >
              {subject} ||{" "}
            </span>
          ))}
        </div>
      ) : (
        <p>No subjects available</p>
      )}
    </>
  );
}
