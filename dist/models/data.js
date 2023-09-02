"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Data = void 0;
var _mongoose = require("mongoose");
var dataSchema = new _mongoose.Schema({
  idModule: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "modules"
  },
  date_debut: {
    type: Date
  },
  date_fin: {
    type: Date
  },
  infos: [{
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
    date: {
      type: Date
    }
  }]
}, {
  timestamps: true
});
var Data = (0, _mongoose.model)("data", dataSchema);
exports.Data = Data;