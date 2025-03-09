import Teacher from "./public/assets/images/teacher.jpg"
const name = {
  user : "Paul Sawer",
  age: 35,
}

export default function App(){
  return (
    <>
      <img src={Teacher} alt="beautiful teacher teaching" />
      <h1>{name.user}</h1>
      <p>{name.age}</p>
    </>
    
  )
}











/* Test 1 */
// import "./App.css"

// function MyButton(){
//   return (
//     <button className="btn">Click Me</button>
//   )
// }
// const name = 'John'
// export default function App(){
//   return (
//     <div className="container">
//       <div class="subcontainer">
//         <h1>{name}</h1>
//         <MyButton />
//       </div>
//     </div>
//   )
// }