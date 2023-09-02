"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vidange = void 0;
var _mongoose = require("mongoose");
var vidangeSchema = new _mongoose.Schema({
  idModule: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "modules"
  },
  date: {
    type: Date
  },
  remarque: {
    type: String
  },
  doBy: {
    type: String,
    "default": "Inconnu"
  }
}, {
  timestamps: true
});
var Vidange = (0, _mongoose.model)('vidange', vidangeSchema);
exports.Vidange = Vidange;