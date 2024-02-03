import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import { useEffect, useState } from 'react';
const ENDPOINT = "http://127.0.0.1:3005/";

function App() {

  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const socket = socketIOClient.connect(ENDPOINT);


  socket.on("start", data => {
    setStart(true);
  });

  socket.on("count", data => {
    console.log(data);
    setCount(data);
  });

  socket.on("timeout", data => {
    setStart(false);
    setCount(0)
  });

  return (
    <div className="App">
      <h1>{count}</h1>
      <h2>{start ? 'Start pull up' : 'Thank you visit again' }</h2>
    </div>
  );
}

export default App;
