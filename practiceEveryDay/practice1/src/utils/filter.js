import studentsData from '../data/studentsData';

export default function Filter({studentData}){


    /* FILTER OUT ONLY FEMALES */
    const female = studentsData.filter((data) => data.Gender === "Female");
    //console.log(female);

    /* NUMBER OF FEMALE */
    const femaleTotal = studentsData
                        .filter((data) => data.Gender === "Female").length;
    //console.log(femaleTotal);

    /* FILTER OUT ONLY MALES */
    const maleStudents = studentsData
                        .filter((students) => students.Gender === "Male");
    //console.log(maleStudents);

    
    /*LENGTH OF ALL MALE */
    const totalMales = studentsData
                       .filter((students) => students.Gender === "Male")
                       .length
    console.log(totalMales);
}