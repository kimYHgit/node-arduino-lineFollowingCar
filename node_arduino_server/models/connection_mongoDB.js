const mongoose = require("mongoose");
const logger = require("../lib/logger");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose
    .connect("mongodb+srv://user:1111@cluster0.o1o8pkd.mongodb.net/", {
      dbName: "test_collection",
      useNewUrlParser: true,
    })
    .then(() => {
      logger.info("몽고디비 connection success");
    })
    .catch((err) => {
      logger.error("몽고디비 sync error", err);
    });
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
