import React, { useState } from "react";
import { ReactDOM } from "react";
import axios from 'axios'


export default function DisplayRuns({ runs, removeRun }) {
  return (
    <div>
      {runs.map((run, index) => (
        <div key={`${run}` + `${run.index}`} className="runWrapper">
          <div className="run runIndex">Run {index + 1}</div>
          <div className="run runDistance">Distance: {run.distance} {run.distanceType}</div>
          <div className="run runTime">Time: {run.minutes}:{run.seconds}</div>
          <div className="run runSpeed">Speed: {run.calcSpeed()}</div>
          <div className="run runDate">Date: {run.date}</div>
          <button onClick={() => removeRun(run.index)} className="runRemoveBut">Remove</button>
        </div>
      ))}
    </div>
  );
}