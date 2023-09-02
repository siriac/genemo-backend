"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUpperCaseStationName1 = exports.toUpperCaseStationName = exports.getPaginationInfo = void 0;
var getPaginationInfo = function getPaginationInfo(page, limit, count) {
  return {
    page: +page,
    limit: +limit,
    totalCount: count,
    totalPages: Math.ceil(count / limit)
  };
};
exports.getPaginationInfo = getPaginationInfo;
var toUpperCaseStationName1 = function toUpperCaseStationName1(req, res, next) {
  var stationName = req.params.stationName;
  if (stationName) {
    req.params.stationName = stationName.toUpperCase();
    next();
  } else {
    next(new Error("parametre stationName inexistant"));
  }
};
exports.toUpperCaseStationName1 = toUpperCaseStationName1;
var toUpperCaseStationName = function toUpperCaseStationName(req, res, next) {
  var _req$body = req.body,
    stationName = _req$body.site,
    regionName = _req$body.idClient;
  if (stationName && regionName) {
    req.body.stationName = stationName.toUpperCase();
    req.body.regionName = regionName.toUpperCase();
    next();
  } else {
    next(new Error("parametre site et /ou idClient inexistant"));
  }
};
exports.toUpperCaseStationName = toUpperCaseStationName;