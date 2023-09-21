const express = require("express");
const logger = require("../lib/logger");
const axios = require("axios");

const router = express.Router();
const carRouter = require("./car");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

// logTest
router.get("/log-test", (req, res, next) => {
  logger.error("This message is error");
  logger.warn("This message is warn");
  logger.info("This message is info");
  logger.verbose("This message is verbose");
  logger.debug("This message is debug");
  logger.silly("This message is silly");

  // res.send("log test");
  res.status(200).json("test");
});

// sample
// router.use("/departments", departmentRouter);
router.use("/car", carRouter);

router.post("/sensor", async (req, res) => {
  try {
    const params = req.body;
    console.log(req.body.data);

    const result = params;
    // const result = await likeService.like(params);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    console.log(typeof err);
    console.log(Object.keys(err));
    res.status(500).json("err.toString()");
  }
});

module.exports = router;
