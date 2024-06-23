import React, {useState} from "react";
import { ReactDOM } from "react";

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
    <div>
      <div>Time: 
        <label htmlFor="minutes">Minutes: </label>
        <input type="number" id="minutes" name="minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)}/>
        <label htmlFor="seconds">Seconds: </label>
        <input type="number" id="seconds" name="seconds" value={seconds} onChange={(e) => setSeconds(e.target.value)} min={0} max={59}/>
      </div>
      <div>
        <label htmlFor="distance">Distance: </label>
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} name="distance"/>
        <select name="distanceType" id="" value={distanceType} onChange={(e) => setDistanceType(e.target.value)}>
          <option value="Kilometres">Kilometres</option>
          <option value="Miles">Miles</option>
        </select>
      </div>
      <div>
        <label htmlFor="date">Date: </label>
        <input type="date" onChange={(e) => setDate(e.target.value)} name="date"/>
      </div>
      <div>
        <button onClick={handleSubmit}>Add</button>
        <button onClick={closeForm}>X</button>
      </div>
    </div>
  )
}