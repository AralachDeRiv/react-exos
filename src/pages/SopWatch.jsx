import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StopWatch.css";
import goldenWatch from "../img/golden-watch.png";

const SopWatch = () => {
  const [laps, setLaps] = useState([]);
  const [start, setStart] = useState(false);
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState("");
  const navigate = useNavigate();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const goldenWatch = document.querySelector(".goldenWatch-container");
    const backHomeBtn = document.querySelector(".backHome-btn");
    const timer = document.querySelector(".timer");
    const lapsContainer = document.querySelector(".laps-container");

    const start = async () => {
      await delay(200);
      goldenWatch.style.transform = "translateY(0px)";
      await delay(200);
      backHomeBtn.style.transform = "translateX(0px)";
      await delay(1000);
      timer.style.opacity = "1";
      lapsContainer.style.opacity = "1";
    };

    start();
  }, []);

  const backHome = async () => {
    const goldenWatch = document.querySelector(".goldenWatch-container");
    const backHomeBtn = document.querySelector(".backHome-btn");
    const timer = document.querySelector(".timer");
    const lapsContainer = document.querySelector(".laps-container");
    await delay(50);
    timer.style.opacity = "0";
    lapsContainer.style.opacity = "0";
    await delay(600);
    backHomeBtn.style.transform = "translateX(-1000px)";
    await delay(500);
    goldenWatch.style.transform = "translateY(-1000px)";
    await delay(500);
    navigate("/", {
      state: {
        newBackground: "stopWatch-new-background",
      },
    });
  };

  useEffect(() => {
    let interval;
    if (start) {
      interval = setInterval(() => {
        setCounter((prv) => prv + 1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [start]);

  useEffect(() => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    setTimer(`${formattedMinutes}:${formattedSeconds}`);
  }, [counter]);

  return (
    <>
      <div className="page-container stopWatch-page-container">
        <button className="backHome-btn" onClick={backHome}>
          Back Home
        </button>

        <div className="first-container">
          <div className="goldenWatch-container">
            <img src={goldenWatch} />
            <div
              className="reset-btn"
              onClick={() => {
                setCounter(0);
                setLaps([]);
                setStart(false);
              }}
            >
              <p>Reset</p>
            </div>
            <div className="start-btn" onClick={() => setStart(true)}>
              <p>Start</p>
            </div>
            <div
              className="pause-btn"
              onClick={() => {
                setStart(false);
              }}
            >
              <p>Pause</p>
            </div>
            <div
              className="lap-btn"
              onClick={() => setLaps((prev) => [...prev, timer])}
            >
              <p>Lap</p>
            </div>
          </div>
          <h2 className="timer">{timer}</h2>
        </div>
        <div className="laps-container">
          <h2>Laps : </h2>
          <p>{laps.length ? "" : "No laps yet"}</p>
          <ul>
            {laps.map((lap, idx) => (
              <li key={idx}>{lap}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SopWatch;
