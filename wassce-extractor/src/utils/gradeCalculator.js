export function countGradesPerStudent(studentsData) {
  if (!Array.isArray(studentsData)) return [];

  return studentsData.map(student => {
    const gradeCounts = {};
    
    Object.values(student.Subjects).forEach(grade => {
      gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
    });

    return {
      Index: student.Index,
      Name: student.Name,
      Gender: student.Gender,
      GradeCounts: gradeCounts,
      Subjects: student.Subjects
    };
  });
}

export function GetSpecificGradeCounts(studentsData, grade, count) {
  try {
    if (!Array.isArray(studentsData)) {
      throw new Error("No data is available");
    }

    const storeGradeCount = countGradesPerStudent(studentsData).filter(
      data => data.GradeCounts[grade] >= count
    );

    return storeGradeCount.length > 0
      ? storeGradeCount 
      : `No student got ${count} ${grade}'s`;
  } catch (e) {
    return e.message;
  }
}
