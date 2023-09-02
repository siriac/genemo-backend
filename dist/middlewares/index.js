"use strict";

var _authjwt = _interopRequireDefault(require("./authjwt"));
var _verifySignUp = _interopRequireDefault(require("./verifySignUp"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
module.exports = {
  authJwt: _authjwt["default"],
  verifySignUp: _verifySignUp["default"]
};