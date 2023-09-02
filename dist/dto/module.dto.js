"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateModuleResponseDTO = exports.getModuleResponseDTO = exports.getModuleDTO = exports.getModuleByIdResponseDTO = exports.getDeleteModuleResponseDTO = exports.getCreateModuleResponseDTO = void 0;
var _util = require("../lib/util");
var _dateTime = require("../lib/dateTime");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var getModuleDTO = function getModuleDTO(module) {
  return {
    id: module._id,
    idRegion: module.idRegion,
    stationName: module.stationName,
    position: module.position,
    created: module.created,
    duree_fonctionnement: module.duree_fonctionnement,
    duree_fonctionnement_format: module.duree_fonctionnement_format,
    dataRequired: {
      temp: module.dataRequired.temp,
      fuel: module.dataRequired.fuel,
      ph1: module.dataRequired.ph1,
      ph2: module.dataRequired.ph2,
      ph3: module.dataRequired.ph3,
      oilPress: module.dataRequired.oilPress,
      freq: module.dataRequired.freq
    },
    status: module.status,
    lastData: module === null || module === void 0 ? void 0 : module.lastData,
    elapse: module.elapse,
    elapse_total_hours_minutes: (0, _dateTime.getDurationHoursAndMinutes)(module.elapse_total),
    //module.elapse_total,
    elapse_total: module.elapse_total,
    elapse_hours_minutes: (0, _dateTime.getDurationHoursAndMinutes)(module.elapse) //module.elapse_total,
  };
};
exports.getModuleDTO = getModuleDTO;
var getModuleResponseDTO = function getModuleResponseDTO(modules, page, limit, count) {
  return {
    data: modules.map(getModuleDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getModuleResponseDTO = getModuleResponseDTO;
var getModuleByIdResponseDTO = function getModuleByIdResponseDTO(module) {
  return {
    data: getModuleDTO(module)
  };
};
exports.getModuleByIdResponseDTO = getModuleByIdResponseDTO;
var getCreateModuleResponseDTO = function getCreateModuleResponseDTO(module) {
  var _ref;
  return _ref = {
    message: "Module crée avec succés",
    id: module._id,
    idRegion: module.idRegion,
    stationName: module.stationName
  }, _defineProperty(_ref, "stationName", module.stationName), _defineProperty(_ref, "position", module.position), _defineProperty(_ref, "created", module.created), _defineProperty(_ref, "duree_fonctionnement", module.duree_fonctionnement), _defineProperty(_ref, "duree_fonctionnement_format", module.duree_fonctionnement_format), _defineProperty(_ref, "dataRequired", {
    temp: module.dataRequired.temp,
    fuel: module.dataRequired.fuel,
    ph1: module.dataRequired.ph1,
    ph2: module.dataRequired.ph2,
    ph3: module.dataRequired.ph3,
    oilPress: module.dataRequired.oilPress,
    freq: module.dataRequired.freq
  }), _defineProperty(_ref, "status", module.status), _defineProperty(_ref, "lastData", module === null || module === void 0 ? void 0 : module.lastData), _defineProperty(_ref, "elapse", module.elapse), _defineProperty(_ref, "elapse_total", module.elapse_total), _ref;
};
exports.getCreateModuleResponseDTO = getCreateModuleResponseDTO;
var getDeleteModuleResponseDTO = function getDeleteModuleResponseDTO(module) {
  return {
    message: "Module supprimé avec succés",
    id: module._id
  };
};
exports.getDeleteModuleResponseDTO = getDeleteModuleResponseDTO;
var getUpdateModuleResponseDTO = function getUpdateModuleResponseDTO(module) {
  return {
    message: "Module mis à jour avec succés",
    id: module._id,
    stationName: module.stationName,
    idRegion: module.idRegion,
    position: module.position,
    created: module.created,
    duree_fonctionnement: module.duree_fonctionnement,
    duree_fonctionnement_format: module.duree_fonctionnement_format,
    dataRequired: {
      temp: module.dataRequired.temp,
      fuel: module.dataRequired.fuel,
      ph1: module.dataRequired.ph1,
      ph2: module.dataRequired.ph2,
      ph3: module.dataRequired.ph3,
      oilPress: module.dataRequired.oilPress,
      freq: module.dataRequired.freq
    },
    status: module.status,
    lastData: module === null || module === void 0 ? void 0 : module.lastData,
    elapse: module.elapse,
    elapse_total: module.elapse_total,
    date: module.date
  };
};
exports.getUpdateModuleResponseDTO = getUpdateModuleResponseDTO;