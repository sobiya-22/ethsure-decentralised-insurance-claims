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
      <h1>EthSure</h1>
      <div className="card">
        <h1>{message}</h1>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;