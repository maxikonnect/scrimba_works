import { useState, useEffect} from 'react'

export default function Subjects({studentsData}){

    const[results, setResults] = useState(null);

    useEffect(()=> {
        const students = studentsData
        .filter((student) => student.Gender === 'Male' && student.Name.startsWith("AB"))
        

        console.log(students);
    })
}