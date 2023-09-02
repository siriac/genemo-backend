"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StandBy = void 0;
var _mongoose = require("mongoose");
var standBySchema = new _mongoose.Schema({
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
    batterie: {
      type: Number
    },
    fuel: {
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
var StandBy = (0, _mongoose.model)("standBy", standBySchema);
exports.StandBy = StandBy;