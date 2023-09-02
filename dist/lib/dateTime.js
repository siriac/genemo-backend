"use strict";

var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
module.exports.getLocalTime = function (date) {
  var now = new Date();
  return new Date(date.getTime() - now.getTimezoneOffset() * 60000);
};
module.exports.getDurationHoursAndMinutes = function (elapse_total) {
  var duration = _moment["default"].duration(elapse_total);
  var o = {
    hours: 0,
    minutes: 0
  };
  o.hours = Math.floor(duration.asHours());
  var restDuration = duration.subtract(_moment["default"].duration(o.hours, "hours"));
  //console.log(restDuration);
  o.minutes = Math.floor(restDuration.minutes());
  //console.log(o);
  return o;
};