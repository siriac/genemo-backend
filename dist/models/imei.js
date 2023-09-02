"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Imei = void 0;
var _mongoose = require("mongoose");
var imeiSchema = new _mongoose.Schema({
  imei: {
    type: String
  },
  isBusy: {
    type: Boolean,
    "default": false
  },
  enabled: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var Imei = (0, _mongoose.model)('imeis', imeiSchema);
exports.Imei = Imei;