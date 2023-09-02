"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = require("mongoose");
var userSchema = new _mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: String,
  email: {
    type: String,
    trim: true,
    required: true
  },
  roles: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "roles"
  }],
  idTownAuthorise: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "regions"
  }]
}, {
  timestamps: true
});
var User = (0, _mongoose.model)('users', userSchema);
exports.User = User;