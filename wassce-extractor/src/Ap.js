import React, { useState } from "react";
import UploadPDF from "./components/UploadPDF";
import { GetSpecificGradeCounts, countGradesPerStudent } from "./utils/gradeCalculator";
import { CountGrade } from "./utils/gradeAnalysis"
import Footer from "./components/Footer"      
import StudentSearch from "./utils/StudentSearch"      
import SearchSingleStudent from "./utils/SearchSingleStudent";
import GenerateBySubject from "./utils/GenerateBySubject"
import GenerateOnlySubject from './utils/GenerateOnlySubject'

export default function App() {  
  const [studentsData, setStudentsData] = useState([]);

  const subjectElements = studentsData.map(data => data["Subjects"]);
  const subjectNames = [...new Set(subjectElements.flatMap(subjects => Object.keys(subjects)))];
  const subjects = subjectNames.filter(subject => /[a-zA-Z]/.test(subject));

 

  const groupSubjects = [];
  for (let [index, subject] of subjects.entries()) {
    groupSubjects.push(CountGrade(studentsData, `${index + 1}`, subject));
  }

  console.log(groupSubjects)
  
  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
          Upload PDFs to Extract Student Data
        </h1>

        {/* First File Upload */}
        <h3>Upload First PDF</h3>
        {<UploadPDF setStudentsData={setStudentsData} />}

        {/* Second File Upload */}
        <h3>Upload Second PDF</h3>
        <UploadPDF setStudentsData={setStudentsData} />

      </div>
      <div>
        <div>
          {groupSubjects.map(sub => sub.subject + "  ||  ")}
        </div>            
        <table className="table">
          
          <caption> Wassce Results Analysis</caption>
          <thead>
            <tr>        
              <th>Subject</th>
              <th colSpan="9">Grades</th>
              <th>Percentage Pass(A1-C6)</th>
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
            {groupSubjects.map(subjectData =>{
                return(
                  <tr key={subjectData.id}>
                    <td>{subjectData.subject}</td>
                        {subjectData.grade
                        .filter(studentGrade => studentGrade.resultsCame)
                        .map(getGrade =>{const total = getGrade.male + getGrade.female
                        return(
                        <td>{total === 0 ? "-" : total}</td>
                        )
                      })
                    }

                    <td>{((subjectData.grade
                    .filter(studentGrade => studentGrade.hasPassed)
                    .reduce((total, acc)=> total + acc.male + acc.female,0 ) 
                    / subjectData.grade
                    .filter(studentGrade => studentGrade.resultsCame)
                    .reduce((total, acc) => total + acc.male + acc.female, 0)) * 100)
                    .toFixed(2)}
                    </td>


                    <td>{subjectData.grade
                        .filter(studentGrade => studentGrade.resultsCame)
                        .reduce((total, acc) => total + acc.male + acc.female, 0)}
                    </td>
                  </tr>
                )
            })}
          </tbody>
          
        </table>
        <StudentSearch studentsData={studentsData} />
        <SearchSingleStudent studentsData={studentsData} />
        <GenerateBySubject studentsData={studentsData} />
        <GenerateOnlySubject studentsData={studentsData} />
      </div>
      <Footer/>
    </>

  );
}
