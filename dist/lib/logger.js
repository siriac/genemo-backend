"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _path = _interopRequireDefault(require("path"));
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _winston$format = _winston["default"].format,
  timestamp = _winston$format.timestamp,
  label = _winston$format.label,
  combine = _winston$format.combine,
  json = _winston$format.json;
var logDir = "".concat(_path["default"].resolve('./'), "/logs");
var logger = _winston["default"].createLogger({
  format: combine(label({
    label: 'genemo'
  }), timestamp(), json()),
  transports: [new _winston["default"].transports.Console({
    handleExceptions: true
  }), new _winston["default"].transports.File({
    filename: "".concat(logDir, "/combined.log")
  })]
});
logger.stream = {
  write: function write(message, encoding) {
    logger.info(message);
  }
};
var _default = logger;
exports["default"] = _default;