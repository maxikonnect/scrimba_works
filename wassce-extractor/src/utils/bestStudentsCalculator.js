export default function bestStudentsCalculator(studentsData) {
  if (!Array.isArray(studentsData) || studentsData.length === 0) {
    return [];
  }

  // Define core subjects
  const coreSubjectsList = ["ENGLISH LANG", "INTEGRATED SCIENCE", "MATHEMATICS(CORE)", "SOCIAL STUDIES"];

  // Define elective subject groups
  const Science = ["PHYSICS", "CHEMISTRY"];
  const HomeEconomics = ["FOODS & NUTRITION", "MGT IN LIVING"];
  const Business = ["BUSINESS MANAGEMENT", "FINANCIAL ACCOUNTING"];
  const VisualArts = ["LEATHERWORK", "PICTURE MAKING", "TEXTILES"];
  const GeneralArts = ["HISTORY", "TWI(ASANTE)", "CHRISTIAN REL STUD", "GOVERNMENT"];

  // Define grade rankings
  const gradeOrder = {
    "A1": 1, "B2": 2, "B3": 3, "C4": 4, "C5": 5, "C6": 6,
    "D7": 7, "E8": 8, "F9": 9, "*": 10, "W": 10, "X": 10
  };

  // Filter out students with invalid grades
  const validStudents = studentsData.filter(student => 
    !Object.values(student.Subjects).some(grade => ["F9", "*", "W", "X"].includes(grade))
  );

  // Process each student
  const students = validStudents.map((student) => {
    // Determine the course offered
    let course = "";
    const subjectsTaken = Object.keys(student.Subjects);

    if (subjectsTaken.some(subject => Science.includes(subject))) {
      course = "SCIENCE";
    } else if (subjectsTaken.some(subject => HomeEconomics.includes(subject))) {
      course = "HOME ECONOMICS";
    } else if (subjectsTaken.some(subject => Business.includes(subject))) {
      course = "BUSINESS";
    } else if (subjectsTaken.some(subject => VisualArts.includes(subject))) {
      course = "VISUAL ARTS";
    } else if (subjectsTaken.some(subject => GeneralArts.includes(subject))) {
      course = "GENERAL ARTS";
    }

    // Extract core subjects
    const corePapers = Object.fromEntries(
      Object.entries(student.Subjects).filter(([subject]) => coreSubjectsList.includes(subject))
    );

    // Extract elective subjects
    const electivePapers = Object.fromEntries(
      Object.entries(student.Subjects).filter(([subject]) => !coreSubjectsList.includes(subject))
    );

    // Separate important core subjects
    const english = corePapers["ENGLISH LANG"];
    const math = corePapers["MATHEMATICS(CORE)"];
    const science = corePapers["INTEGRATED SCIENCE"];
    const socialStudies = corePapers["SOCIAL STUDIES"];

    // Choose the better grade between Science and Social Studies
    let bestCoreSubject = science;
    if (science && socialStudies && gradeOrder[socialStudies] < gradeOrder[science]) {
      bestCoreSubject = socialStudies;
    }

    // Ordered core subjects (English, Math, and best of Science/Social Studies)
    const orderedCoreSubjects = {
      "ENGLISH LANG": english,
      "MATHEMATICS(CORE)": math,
      [bestCoreSubject ? (bestCoreSubject === science ? "INTEGRATED SCIENCE" : "SOCIAL STUDIES") : ""]: bestCoreSubject,
    };

    // Extract top 3 elective subjects based on the best grades
    const bestElectives = Object.fromEntries(
      Object.entries(electivePapers)
        .sort((a, b) => gradeOrder[a[1]] - gradeOrder[b[1]]) // Sort by best grades
        .slice(0, 3) // Pick top 3 electives
    );

    // Calculate total grade
    const totalGrade = Object.values(orderedCoreSubjects)
      .concat(Object.values(bestElectives))
      .reduce((sum, grade) => sum + (gradeOrder[grade] || 0), 0);

    return {
      Index: student.Index,
      Name: student.Name,
      Gender: student.Gender,
      Core: orderedCoreSubjects,
      Elective: bestElectives,
      Course: course,
      TotalGrade: totalGrade,
      corePapers: corePapers,
      electivePapers: electivePapers,
    };
  });

  // Sort students by best total grade (lowest first)
  return students.sort((a, b) => a.TotalGrade - b.TotalGrade);
}
