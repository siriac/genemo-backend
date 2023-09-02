"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Running = void 0;
var _mongoose = require("mongoose");
var runningSchema = new _mongoose.Schema({
  idModule: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "modules"
  },
  temperature: {
    type: Number
  },
  fuel: {
    type: Number
  },
  frequence: {
    type: Number
  },
  pression_huile: {
    type: Number
  },
  phase1: {
    type: Number
  },
  phase2: {
    type: Number
  },
  duree: {
    type: String
  }
}, {
  timestamps: true
});
var Running = (0, _mongoose.model)("running", runningSchema);
exports.Running = Running;