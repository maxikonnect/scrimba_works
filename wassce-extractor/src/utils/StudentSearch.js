import { useState } from 'react';
import { GetSpecificGradeCounts } from './gradeCalculator';

const StudentSearch = ({ studentsData }) => {
  const [results, setResults] = useState(null);
  const [countGrade, setcountGrade] = useState('')
  const [numberOfTimes, setnumberOfTimes] = useState('')

  function Search(event) {
    event.preventDefault(); // Prevent page refresh

    const formData = new FormData(event.target);
    const countGrade = formData.get("countGrade").toUpperCase().trim();
    const numberOfTimes = formData.get("numberOfTimes").trim();

    setcountGrade(countGrade)
    setnumberOfTimes(numberOfTimes)
    const filteredStudents = GetSpecificGradeCounts(studentsData, countGrade, numberOfTimes);
    setResults(filteredStudents);
    
  }

  return (
    <div>
      <form onSubmit={Search}> 
        <h3>Check students who got a specific grade.</h3>

        <label htmlFor="countGrade">Enter Grade:</label>
        <input
          type="text"
          id="countGrade"
          name="countGrade"
          placeholder="Enter either A1, B2, B3, C4, C5, C6, D7, E8, F9"
          required
        />

        <label htmlFor="numberOfTimes">Number of times</label>
        <input type="number" id="numberOfTimes" name="numberOfTimes" required />

        <button type="submit">Submit</button>
      </form>

      
      {Array.isArray(results) ? (
        <table>
          <caption>Students who got <strong>Atleast</strong> {numberOfTimes} {countGrade}'s </caption>
          <thead>
            <tr>
              <th></th>
              <th>Index</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Results</th>
              </tr>
          </thead>
          <tbody>
              {results.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}.{ }</td>
                  <td>{ student.Index}</td>
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
      ) : results ? (
        <p>{results}</p> 
      ) : null}
    </div>
  );
};

export default StudentSearch;
