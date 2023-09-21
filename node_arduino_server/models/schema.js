const mongoose = require("mongoose");

const { Schema } = mongoose;
const sensorSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("sensor", sensorSchema);
