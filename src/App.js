import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from "react-use/lib/useWindowSize";
const ENDPOINT = "http://127.0.0.1:3005/";

function App() {

  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [confelli, setConfelli] = useState(false);
  const socket = socketIOClient.connect(ENDPOINT);

  const { width, height } = useWindowSize();
  socket.on("start", data => {
    setStart(true);
  });

  socket.on("count", data => {
    console.log(data);
    if (data % 10 === 0) {
      setConfelli(true)
      setTimeout(()=>{
        setConfelli(false)
      },2000)
    }
    setCount(data);
  });

  socket.on("timeout", data => {
    setStart(false);
    setCount(0)
  });

  return (
    <div className="App">
      <Confetti width={width} height={height} recycle={confelli} />
      <h1>{count}</h1>
      <h2>{start ? 'Start pull up' : 'Thank you visit again' }</h2>
    </div>
  );
}

export default App;
