import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import AddRun from "./addRun";
import DisplayRuns from "./displayRuns";
import axios from 'axios'
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setBackendRuns } from "../store/authSlice"
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Main() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.user)

  const [runs, setRuns] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getem = async () => {
      try {
        const geting = await axios.get('http://localhost:8080/get-runs', {params: {user}})
        console.log(geting)
        let runs2 = runs
        geting.forEach(run => {
          if (runs.includes(run)) {
            console.log('no bish')
          } else {
            runs2.push(run)
          }
        })
        setRuns(runs2)
        setError(null)
        console.log(runs)
        console.log("Useeffect firing")
      } catch (err) {
        setError('Couldnt fetch runs')
      }
    }
    getem()
  }, [user]); 

  function openForm () {
    setShowForm(!showForm)
  }

  function handleClick () {
    setShowForm(!showForm)
    dispatch(setBackendRuns({ username: user, runs: runs }));
  }

  function calcSpeed (minutes, seconds, distanceType, distance) {
    const timeInSeconds = Number(minutes) * 60 + Number(seconds);
    const speed = distanceType === "Kilometres"
      ? distance / (timeInSeconds / 3600)
      : distance / (timeInSeconds / 3600) * 1.60934; // Miles to km
    return distanceType === "Kilometres" ? `${speed.toFixed(2)} Km/h` : `${speed.toFixed(2)} mph`;
  }

  const addRun = (minutes, seconds, distance, distanceType, date) => {
    let newRun = {
      minutes,
      seconds,
      distance,
      distanceType,
      index: (runs.length + 1),
      date,
      speed: calcSpeed(minutes, seconds, distanceType, distance)
    };
    console.log(runs)
    console.log(newRun)
    setRuns(runs => [...runs, newRun]);
    console.log(runs)
    setShowForm(false);
    console.log("Updated runs array:", runs); // Add this log
  };

  const removeRun = (index) => {
    let newRuns = runs.filter((run) => run.index !== index)
    console.log(newRuns)
    setRuns(newRuns);
    dispatch(setBackendRuns({ username: user, runs: runs }));
  };

  return (
    <div className="allWrapper">
      {!loggedIn ? <Navigate to='/signup' replace={true} /> : null}
      <div>
        <button onClick={openForm} className="openFormBut">Add new</button>
      </div>
      {showForm && (<AddRun addRun={addRun} closeForm={handleClick}/>)}
      <DisplayRuns runs={runs} removeRun={removeRun} /> 
    </div>
  )
}