"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeDB = void 0;
var _config = _interopRequireDefault(require("config"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _logger = _interopRequireDefault(require("./lib/logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var connectionString = _config["default"].get('mongodb');
var initializeDB = function initializeDB() {
  _mongoose["default"].connect(connectionString, function () {
    _logger["default"].info('Connected to MongoDB!!');
  });
};
exports.initializeDB = initializeDB;