import axios from "axios";
import React, { useState } from "react";

export default function App() {
  const [carStateFollow, setCarStateFollow] = useState(true);
  const [carStateReverse, setCarStateReverse] = useState(true);
  const [carStateSpeed1, setCarStateSpeed1] = useState(true);
  const [carStateSpeed2, setCarStateSpeed2] = useState(true);
  const [carStateStartStop, setCarStateStartStop] = useState(true);
  const [camera, setCamera] = useState(true);
  const [cameraTurn, setCameraTurn] = useState(true);
  const [switchState, setSwitchState] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  // 카메라 제어
  const TurnCamera = (e) => {
    setCameraTurn((prevState) => !prevState);
    e.preventDefault();
    try {
      axios
        .get("/car/view")
        .then((res) => {
          let result = res.data;
          console.log(result);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };

  // 모달 창을 여닫는 함수
  const showModal = () => {
    setIsModalShow((prevState) => !prevState);
    setCamera((prevState) => !prevState);
  };

  // 차량 트래킹 제어
  const handleFollow = (e) => {
    setCarStateFollow((prevState) => !prevState);
    e.preventDefault();
    try {
      axios
        .get("/car/track")
        .then((res) => {
          let result = res.data;
          console.log(result);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };

  // 차량 후진 제어
  const handleReverse = (e) => {
    setCarStateReverse((prevState) => !prevState);
    setCarStateSpeed1(true);
    setCarStateSpeed2(true);
    e.preventDefault();
    try {
      axios
        .get("/car/backward")
        .then((res) => {
          let result = res.data;
          console.log(result);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };

  // 차량 속도 제어 1
  const handleSpeed1 = (e) => {
    setCarStateSpeed1((prevState) => !prevState);
    setCarStateReverse(true);
    setCarStateSpeed2(true);
    e.preventDefault();
    try {
      axios
        .get("/car/speed1")
        .then((res) => {
          let result = res.data;
          console.log(result);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };

  // 차량 속도 제어 2
  const handleSpeed2 = (e) => {
    setCarStateSpeed2((prevState) => !prevState);
    setCarStateReverse(true);
    setCarStateSpeed1(true);
    e.preventDefault();
    try {
      axios
        .get("/car/speed2")
        .then((res) => {
          let result = res.data;
          console.log(result);
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };

  // 차량 시동 제어
  const handleStartStop = (e) => {
    setSwitchState((prevState) => !prevState);
    e.preventDefault();
    try {
      if (switchState === true) {
        axios
          .get("/car/start")
          .then((res) => {
            let result = res.data;
            console.log(result);
          })
          .catch((err) => {
            throw err;
          });
      }
      if (switchState === false) {
        setCarStateReverse(true);
        setCarStateSpeed1(true);
        setCarStateSpeed2(true);
        axios
          .get("/car/stop")
          .then((res) => {
            let result = res.data;
            console.log(result);
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.log(error);
    }
    setCarStateStartStop((prevState) => !prevState);
  };

  // 차트 링크 이동
  const moveChart = () => {
    window.location.href = "http://192.168.0.111:1880/ui";
  };

  return (
    <>
      <p className="miniTitle">Line Following Car</p>
      <button type="button" className="chart" onClick={moveChart}>
        Chart
      </button>
      <button
        type="button"
        className={camera ? "camera" : "cameraActive"}
        onClick={showModal}
      >
        ●
      </button>
      <div className="car" />
      <p className="panelTitle">Panel</p>
      <button
        type="button"
        className={carStateStartStop ? "btn" : "btnActive"}
        onClick={handleStartStop}
      >
        {carStateStartStop ? "START" : "STOP"}
      </button>
      <button
        type="button"
        className={carStateFollow ? "followBtn" : "followBtnActive"}
        onClick={handleFollow}
      >
        Follow
      </button>
      <div className="speedBtnBody">
        <button
          type="button"
          className={carStateReverse ? "speedBtn" : "speedBtnActive"}
          onClick={handleReverse}
        >
          R
        </button>
        <button
          type="button"
          className={carStateSpeed1 ? "speedBtn" : "speedBtnActive"}
          onClick={handleSpeed1}
        >
          1
        </button>
        <button
          type="button"
          className={carStateSpeed2 ? "speedBtn" : "speedBtnActive"}
          onClick={handleSpeed2}
        >
          2
        </button>
      </div>
      {/* 모달창 */}
      {isModalShow && (
        <div>
          <img src="http://192.168.0.111:8000/stream.mjpg" className="modal" />
          <button
            className={cameraTurn ? "cameraTurnFront" : "cameraTurnBack"}
            onClick={TurnCamera}
          >
            Turn
          </button>
        </div>
      )}
    </>
  );
}
