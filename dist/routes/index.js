"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _menu = _interopRequireDefault(require("./menu"));
var _module = _interopRequireDefault(require("./module"));
var _imei = _interopRequireDefault(require("./imei"));
var _data = _interopRequireDefault(require("./data"));
var _activities_duration = _interopRequireDefault(require("./activities_duration/activities_duration"));
var _trame = _interopRequireDefault(require("./trame"));
var _vidange = _interopRequireDefault(require("./vidange"));
var _region = _interopRequireDefault(require("./region"));
var _users = _interopRequireDefault(require("./users"));
var _auth = _interopRequireDefault(require("./auth"));
var _role = _interopRequireDefault(require("./role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
//router.use('/menu', menuRoutes);
router.use('/modules', _module["default"]);
router.use('/trames', _trame["default"]);
router.use('/vidanges', _vidange["default"]);
router.use('/imei', _imei["default"]);
router.use('/data', _data["default"]);
router.use('/timeOfActivities', _activities_duration["default"]);
router.use('/regions', _region["default"]);
router.use('/users', _users["default"]);
router.use('/auth', _auth["default"]);
router.use('/roles', _role["default"]);
var _default = router;
exports["default"] = _default;