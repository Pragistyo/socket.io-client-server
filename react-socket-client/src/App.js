import React, { useEffect, useState, useRef} from "react";
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:9000";


function App() {
  const [response, setResponse] = useState("");
  const [arrResponse, setArrResponse]= useState([]);
  const responseRef = useRef(arrResponse)

  //componentDidmount & componentDidUpdate
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data); // setState in class component
      setArrResponse(arrResponse => [...arrResponse, [data+" "]]      )
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect(); //avoid memory leak?
    //
  }, []);

  const activateLasers = (e) =>{
    e.preventDefault()
    alert(`I'm here`)
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button >
          <p> 
            {arrResponse}
          {/* <time dateTime={response}>{response}</time> */}
          </p>
        </button>
        <button onClick={activateLasers}>
          <p>Fire 'Im Here</p>
        </button>
      </header>
    </div>
  );
}

export default App;
