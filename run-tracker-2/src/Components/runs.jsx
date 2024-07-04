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
import { GetRuns } from "./getRuns";

export default function Main() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.user)

  const [runs, setRuns] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:8080/get-runs', {params: {user}})
    .then(res => {
      let runs = []
      res.data.forEach(run => runs.push(run))
      if (runs == undefined) {
        return
      } else {
        setRuns(runs)
      }
      setError(null)
      console.log(runs)
    })
    .catch(err => setError('Couldnt fetch users'))
  }, [user]); 

  function openForm () {
    setShowForm(!showForm)
  }

  function handleClick () {
    setShowForm(!showForm)
    dispatch(setBackendRuns({ username: user, runs: runs }));
  }

  const addRun = (minutes, seconds, distance, distanceType, date) => {
    let newRun = {
      minutes,
      seconds,
      distance,
      distanceType,
      index: (runs.length + 1),
      date,
      calcSpeed: () => {
        const timeInSeconds = Number(minutes) * 60 + Number(seconds);
        const speed = distanceType === "Kilometres"
          ? distance / (timeInSeconds / 3600)
          : distance / (timeInSeconds / 3600) * 1.60934; // Miles to km
        return distanceType === "Kilometres" ? `${speed.toFixed(2)} Km/h` : `${speed.toFixed(2)} mph`;
      }
    };
    newRun.index = (runs.length + 1) + newRun;
    setRuns(runs.push(newRun));
    setShowForm(false);
    console.log("Updated runs array:", runs); // Add this log
  };

  const removeRun = (index) => {
    setRuns(runs.filter((run) => run.index !== index));
    dispatch(setBackendRuns({ username: user, runs: runs }));
  };

  return (
    <div className="allWrapper">
      <div>
        <button onClick={openForm} className="openFormBut">Add new</button>
      </div>
      {showForm && (<AddRun addRun={addRun} closeForm={handleClick}/>)}
      <DisplayRuns runs={runs} removeRun={removeRun} />
      {!loggedIn ? <Navigate to='/signup' replace={true} /> : null}
    </div>
  )
}