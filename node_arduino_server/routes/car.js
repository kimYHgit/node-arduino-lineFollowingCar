const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const axios = require("axios");

router.get("/start", (req, res) => {
  try {
    axios
      .get("http://192.168.0.111:1880/car/start")
      .then((res) => {
        console.log(res.status, res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json("drive start");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/stop", (req, res) => {
  try {
    let result = null;
    axios
      .get("http://192.168.0.111:1880/car/stop")
      .then((res) => {
        console.log(res.status, res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json("drive stop");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/backward", (req, res) => {
  try {
    axios
      .get("http://192.168.0.111:1880/car/backward")
      .then((res) => {
        console.log(res.status, res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json("backward");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/speed1", (req, res) => {
  try {
    axios
      .get("http://192.168.0.111:1880/car/speed1")
      .then((res) => {
        console.log(res.status, res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json("car speed : speed1");
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/speed2", (req, res) => {
  try {
    axios
      .get("http://192.168.0.111:1880/car/speed2")
      .then((res) => {
        console.log(res.status, res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json("car speed : speed2");
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/track", (req, res) => {
  try {
    axios
      .get("http://192.168.0.111:1880/car/track")
      .then((res) => {
        console.log(res.status, res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json("line tracking....");
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/view", (req, res) => {
  try {
    axios
      .get("http://192.168.0.111:1880/car/view")
      .then((res) => {
        console.log(res.status, res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json("camera");
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
