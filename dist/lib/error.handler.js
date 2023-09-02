"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(error, req, res, next) {
  _logger["default"].error(error.message || error);
  res.status(error.status || 500).json({
    message: error.message || 'Unexpected Server Error'
  });
};
exports["default"] = _default;