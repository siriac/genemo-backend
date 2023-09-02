"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Activities = void 0;
var _mongoose = require("mongoose");
var schema = new _mongoose.Schema({
  idModule: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "modules"
  },
  date: {
    type: Date
  },
  activities: [{
    heure_demarage: {
      type: Date
    },
    heure_arret: {
      type: Date
    }
  }]
}, {
  timestamps: true
});
var Activities = (0, _mongoose.model)("activities", schema);
exports.Activities = Activities;