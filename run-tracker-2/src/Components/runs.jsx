import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import AddRun from "./addRun";
import DisplayRuns from "./displayRuns";
import axios from 'axios'

export default function Main() {

  const [runs, setRuns] = useState([])
  const [showForm, setShowForm] = useState(false)

  function handleClick() {
    setShowForm(!showForm)
  }

  const addRun = (minutes, seconds, distance, distanceType, date) => {
    const newRun = {
      minutes,
      seconds,
      distance,
      distanceType,
      index: (runs.length + 1) + run,
      date,
      calcSpeed: () => {
        const timeInSeconds = Number(minutes) * 60 + Number(seconds);
        const speed = distanceType === "Kilometres"
          ? distance / (timeInSeconds / 3600)
          : distance / (timeInSeconds / 3600) * 1.60934; // Miles to km
        return distanceType === "Kilometres" ? `${speed.toFixed(2)} Km/h` : `${speed.toFixed(2)} mph`;
      }
    };
    setRuns([...runs, newRun]);
    setShowForm(false);
  };

  const removeRun = (index) => {
    setRuns(runs.filter((run) => run.index !== index));
  };

  return (
    <div className="allWrapper">
      <div>
        <button onClick={handleClick} className="openFormBut">Add new</button>
      </div>
      {showForm && (<AddRun addRun={addRun} closeForm={handleClick}/>)}
      <DisplayRuns runs={runs} removeRun={removeRun} />
    </div>
  )
}