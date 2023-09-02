"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;
var _mongoose = require("mongoose");
var menuSchema = new _mongoose.Schema({
  name: String,
  description: String,
  isDeleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var Menu = (0, _mongoose.model)('menus', menuSchema);
exports.Menu = Menu;