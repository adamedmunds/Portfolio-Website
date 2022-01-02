import React, { useState, useEffect } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch("/rpn")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          The current time is:
          <br /> {Date(currentTime)}.
        </p>
      </header>
    </div>
  );
}

export default App;
