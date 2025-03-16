export function processExtractedText(text, setStudentsData) {
    text = text.replace(/\s{2,}/g, " ").trim();
  
    // Regex to find student blocks
    const studentRegex = /(\d{10})\s+([A-Za-z- ]+)\s+(Male|Female)\s+(\d{2}\/\d{2}\/\d{4})\s+([\s\S]*?)(?=\d{10}|$)/g;
  
    let studentsArray = [];
    let match;
  
    while ((match = studentRegex.exec(text)) !== null) {
      let index = match[1].trim();
      let name = match[2].trim();
      let gender = match[3].trim();
      let dob = match[4].trim();
      let subjectsText = match[5].trim();
  
      let subjects = {};
      
      const subjectRegex = /([A-Za-z\s()&-]+)\s*-\s*([A-Z0-9*]+)/g;
      let subjectMatch;
  
      while ((subjectMatch = subjectRegex.exec(subjectsText)) !== null) {
        subjects[subjectMatch[1].trim()] = subjectMatch[2].trim();
      }
  
      studentsArray.push({
        Index: index,
        Name: name,
        Gender: gender,
        Dob: dob,
        Subjects: subjects,
      });
    }
  
    // Append new students instead of replacing existing ones
    setStudentsData((prevData) => [...prevData, ...studentsArray]);
  }
  