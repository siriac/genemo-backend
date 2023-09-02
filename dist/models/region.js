"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Region = void 0;
var _mongoose = require("mongoose");
var regionSchema = new _mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});
var Region = (0, _mongoose.model)('regions', regionSchema);
exports.Region = Region;