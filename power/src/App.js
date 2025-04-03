import  BestStudentsCalculator from "./bestStudentsCalculator";
import React, { useState } from 'react';
import data from './data';
export default function App(){
  const [results, setResults] = useState(null)

  console.log(BestStudentsCalculator(data));

}