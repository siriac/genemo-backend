"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Role = void 0;
var _mongoose = require("mongoose");
var roleSchema = new _mongoose.Schema({
  name: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});
var Role = (0, _mongoose.model)('roles', roleSchema);
exports.Role = Role;