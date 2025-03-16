/*ITERATING FUNCTION */
export function CheckSubjectTotalPerGender(studentData, entrySubject, gender){
    return (
      studentData.filter((dataValue) => dataValue.Subjects[entrySubject] && dataValue.Gender === gender).length
    )
  }
  
export function GenderBasedGrade(studentData, grade, entrySubject, gender){       
    return (
      studentData.filter((dataValue)=> dataValue.Subjects[entrySubject] === grade && dataValue.Gender === gender).length
    )
  }
  
  
export function CountGrade(studentData, id, entrySubject){
    const totalSubjectMale = CheckSubjectTotalPerGender(studentData, entrySubject, 'Male');
    const totalSubjectFemale = CheckSubjectTotalPerGender(studentData, entrySubject, 'Female');                                   
    const malesWhoGotA1 = GenderBasedGrade(studentData, "A1", entrySubject, "Male");
    const femalesWhoGotA1 = GenderBasedGrade(studentData, "A1", entrySubject, "Female");
  
    const malesWhoGotB2 = GenderBasedGrade(studentData, "B2", entrySubject, "Male");
    const femalesWhoGotB2 = GenderBasedGrade(studentData, "B2", entrySubject, "Female");
  
    const malesWhoGotB3 = GenderBasedGrade(studentData, "B3", entrySubject, "Male");
    const femalesWhoGotB3 = GenderBasedGrade(studentData, "B3", entrySubject, "Female");
  
    const malesWhoGotC4 = GenderBasedGrade(studentData, "C4", entrySubject, "Male");
    const femalesWhoGotC4 = GenderBasedGrade(studentData, "C4", entrySubject, "Female");
  
    const malesWhoGotC5 = GenderBasedGrade(studentData, "C5", entrySubject, "Male");
    const femalesWhoGotC5 = GenderBasedGrade(studentData, "C5", entrySubject, "Female");
  
    const malesWhoGotC6 = GenderBasedGrade(studentData, "C6", entrySubject, "Male");
    const femalesWhoGotC6 = GenderBasedGrade(studentData, "C6", entrySubject, "Female");
  
    const malesWhoGotD7 = GenderBasedGrade(studentData, "D7", entrySubject, "Male");
    const femalesWhoGotD7 = GenderBasedGrade(studentData, "D7", entrySubject, "Female");
  
    const malesWhoGotE8 = GenderBasedGrade(studentData, "E8", entrySubject, "Male");
    const femalesWhoGotE8 = GenderBasedGrade(studentData, "E8", entrySubject, "Female");
  
    const malesWhoGotF9 = GenderBasedGrade(studentData, "F9", entrySubject, "Male");
    const femalesWhoGotF9 = GenderBasedGrade(studentData, "F9", entrySubject, "Female");
  
    const cancelledMales = GenderBasedGrade(studentData, "*", entrySubject, "Male");
    const cancelledFemales = GenderBasedGrade(studentData, "*", entrySubject, "Female");
  
    const WithheldMales = GenderBasedGrade(studentData, "W", entrySubject, "Male");
    const WithheldFemales = GenderBasedGrade(studentData, "W", entrySubject, "Female");
  
    const absentMales = GenderBasedGrade(studentData, "X", entrySubject, "Male");
    const absentFemales = GenderBasedGrade(studentData, "X", entrySubject, "Female");
    return {
        id: id,
        subject: entrySubject,
        totalStudents:{
            Male: totalSubjectMale,
            female: totalSubjectFemale,
            Total: totalSubjectMale + totalSubjectFemale,
        },
        grade:[
          {id: "A1", male: malesWhoGotA1, female: femalesWhoGotA1, hasPassed: true, resultsCame : true},
          {id: "B2", male: malesWhoGotB2, female: femalesWhoGotB2, hasPassed: true, resultsCame : true},
          {id: "B3", male: malesWhoGotB3, female: femalesWhoGotB3, hasPassed: true, resultsCame : true},
          {id: "C4", male: malesWhoGotC4, female: femalesWhoGotC4, hasPassed: true, resultsCame : true},
          {id: "C5", male: malesWhoGotC5, female: femalesWhoGotC5, hasPassed: true, resultsCame : true},
          {id: "C6", male: malesWhoGotC6, female: femalesWhoGotC6, hasPassed: true, resultsCame : true},
          {id: "D7", male: malesWhoGotD7, female: femalesWhoGotD7, hasPassed: false, resultsCame : true},
          {id: "E8", male: malesWhoGotE8, female: femalesWhoGotE8, hasPassed: false, resultsCame : true},
          {id: "F9", male: malesWhoGotF9, female: femalesWhoGotF9, hasPassed: false, resultsCame : true},
          {id: "Cancelled", male: cancelledMales, female: cancelledFemales, hasPassed: false, resultsCame : false},
          {id: "Withheld", male: WithheldMales, female: WithheldFemales, hasPassed: false, resultsCame : false},
          {id: "Absent", male: absentMales, female: absentFemales, hasPassed: false, resultsCame : false},        
        ]
    }
  }
  