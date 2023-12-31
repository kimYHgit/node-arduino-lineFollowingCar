const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsConfig = require("./config/corsConfig.json");
const models = require("./models/index");
const modelsMongoDB = require("./models/connection_mongoDB");
const logger = require("./lib/logger");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const logger1 = require("morgan");
const indexRouter = require("./routes/index");

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
const app = express();
logger.info("app start");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//mysql 연결

// DB 연결 확인 및 table 생성
models.sequelize
  .authenticate()
  .then(() => {
    logger.info("DB connection success");

    // sequelize sync (table 생성)
    models.sequelize
      .sync()
      .then(() => {
        logger.info("Sequelize sync success");
      })
      .catch((err) => {
        logger.error("Sequelize sync error", err);
      });
  })
  .catch((err) => {
    logger.error("DB Connection fail", err);
  });

//mongoDB 연결
modelsMongoDB();

app.use(logger1("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsConfig));
app.use(express.json());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
