import React, {useState} from "react";
import { ReactDOM } from "react";
import axios from 'axios'

export default function AddRun({addRun, closeForm}) {
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const [distance, setDistance] = useState("")
  const [distanceType, setDistanceType] = useState("Kilometres")
  const [date, setDate] = useState("")

  const handleSubmit = () => {
    if (distance == '' || seconds == '' || distance == '' || date == '') {
      alert('Please enter the desired data.')
    } else {
      addRun(minutes, seconds, distance, distanceType, date);
      closeForm()
    }
  };

  return (
    <div className="inputsWrapper">
      <div className="timeInputs">Time: 
        <label htmlFor="minutes" className="minLabel">Minutes: </label>
        <input type="number" id="minutes" name="minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="minInput"/>
        <label htmlFor="seconds" className="secLabel">Seconds: </label>
        <input type="number" id="seconds" name="seconds" value={seconds} onChange={(e) => setSeconds(e.target.value)} min={0} max={59} className="secInput"/>
      </div>
      <div className="distanceInputs">
        <label htmlFor="distance" className="distanceLabel">Distance: </label>
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} name="distance" className="distanceInput"/>
        <select name="distanceType" id="" value={distanceType} onChange={(e) => setDistanceType(e.target.value)} className="distanceTypeInput">
          <option value="Kilometres">Kilometres</option>
          <option value="Miles">Miles</option>
        </select>
      </div>
      <div className="dateInputs">
        <label htmlFor="date" className="dateLabel">Date: </label>
        <input type="date" onChange={(e) => setDate(e.target.value)} name="date" className="dateInput"/>
      </div>
      <div>
        <button onClick={handleSubmit} className="addRunBut">Add</button>
        <button onClick={closeForm} className="closeFormBut">X</button>
      </div>
    </div>
  )
}