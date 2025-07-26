import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/") 
      .then((res) => {
        setMessage(res.data);
      })

  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-green-500">
        Hello world! {message ? message : "Loading..."}
    </h1>
    </>
  );
}

export default App;