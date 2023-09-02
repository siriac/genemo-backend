"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trame = void 0;
var _mongoose = require("mongoose");
var trameSchema = new _mongoose.Schema({
  idModule: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "modules"
  },
  temp: {
    type: Number
  },
  fuel: {
    type: Number
  },
  bat: {
    type: Number
  },
  ph1: {
    type: Number
  },
  ph2: {
    type: Number
  },
  ph3: {
    type: Number
  },
  freq: {
    type: Number
  },
  oilPress: {
    type: Number
  },
  date: {
    type: Date
  },
  status: {
    type: String,
    "enum": ["NOT_RUNNING", "NOT_RUNNING/FAULT", "STOPPED", "RUNNING", "RUNNING/FAULT", "NOT_RUNNING/VIDANGE"]
  }
}, {
  timestamps: true
});
var Trame = (0, _mongoose.model)('trames', trameSchema);
exports.Trame = Trame;