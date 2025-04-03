import data from "./data"



export default function App(){
  return(

  )
}























/*import {useState} from 'react'
const students = [
  {
    id: 1,
    name: "Marvin Gay",
    course:"Science"
  },
  {
    id: 2,
    name: "Marvin Adom",
    course:"French"
  },
  {
    id: 3,
    name: "Marvin",
    course:"French"
  }
]

export default function App(){
  const[count, setCount] = useState(0)

  let hasPrev = count > 0
  let hasNext = count < students.length
  function HandlePick(){
    if(hasNext){
      setCount(count + 1)
    }
    
  }

  function HandlePrev(){
    if(hasPrev){
      setCount(count  - 1)
    } 
  }

  let stu = students[count]
  return(
    <>
      <button onClick={HandlePick} disabled={!hasNext}>Next</button>
      <button onClick={HandlePrev} disabled={!hasPrev}>Prev</button>
      <p>{stu.name}</p> 
      <p>{stu.course}</p>
      <p>{count} of {students.length}</p>
    </>
  )
}
*/

/*
import "./App.css"
import students_3s1 from "./Data/data_3s5"

export default function App(){
  return (
    <main>
      <div className="container">
        <table>
          <caption>ELECTIVE MATHEMATICS 3S5</caption>
          <thead>
            
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Sex</th>
              <th scope="col">Test 1: {students_3s1[0].Test_Scores[0].test1_Total} Marks</th>
              <th scope="col">Amount Paid</th>
              <th scope="col">Owning</th>
            </tr>
          </thead>
          <tbody>
            {students_3s1.map((student)=>{
              return (
                <tr>
                  <td>{student.name}</td>
                  <td>{student.sex}</td>
                  {student.Test_Scores.map((score)=>{
                    return (
                      <td>{score.test1 === "" ? "--" : score.test1}</td>
                    )
                  }
                  )}
                  <td>{student.amountPaid}</td>
                  <td style={{backgroundColor : student.amountPaid === 120 ? "" : "red"}}>{(student.amountPaid === 120 && student.paidEarly) ? "Fully Paid" :
                  ((student.amountPaid > 0 && student.amountPaid < 120) && student.paidEarly) ? 120 - student.amountPaid : 150 - student.amountPaid}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}

*/

/*
export default function App(){
  return (
    <main>
      <div class="container">
        <table>
          <caption>Students</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
            </tr>
          </thead>
          <tbody>
            {
              students_3s1.filter((filtered)=> filtered.amountPaid === 120).map((stud)=>{
                return (<tr key={stud.id}>
                  <td>{stud.name}</td>
                  <td>{stud.sex}</td>
                </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    </main>
  )
 
}
  */