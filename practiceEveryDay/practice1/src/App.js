import studentsData from "./data/studentsData";
import Filter from "./utils/filter";

export default function App(){
  return(
    <>
      <Filter studentsData={studentsData}/>
    </>
  )
}