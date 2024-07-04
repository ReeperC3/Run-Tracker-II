import { useEffect, useState } from "react";
import axios from "axios";



export function GetRuns({ user }) {
  const [runs, setRuns] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:8080/get-runs', { params: { user } })
      .then(res => {
        let runs = []
        res.data.forEach(run => runs.push(run));
        setRuns(runs);
        setError(null);
        console.log(runs);
      })
      .catch(err => setError('Could not fetch runs'));
  }, [user]);

  return runs; // Return runs state from the component
}