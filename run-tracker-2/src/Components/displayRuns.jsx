import React, { useState } from "react";
import { ReactDOM } from "react";


export default function DisplayRuns({ runs, removeRun }) {
  return (
    <div>
      {runs.map((run, index) => (
        <div key={`${run}` + `${run.index}`}>
          <div>Run {index + 1}</div>
          <div>Distance: {run.distance} {run.distanceType}</div>
          <div>Time: {run.minutes}:{run.seconds}</div>
          <div>Speed: {run.calcSpeed()}</div>
          <div>Date: {run.date}</div>
          <button onClick={() => removeRun(run.index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}