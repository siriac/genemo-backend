"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateTrameResponseDTO = exports.getTrameResponseDTO = exports.getTrameDTO = exports.getTrameByIdResponseDTO = exports.getDeleteTrameResponseDTO = exports.getCreateTrameResponseDTO = void 0;
var _util = require("../lib/util");
var _dateTime = require("../lib/dateTime");
var getTrameDTO = function getTrameDTO(trame) {
  return {
    id: trame._id,
    temp: trame.temp,
    fuel: trame.fuel,
    bat: trame.bat,
    ph1: trame.ph1,
    ph2: trame.ph2,
    ph3: trame.ph3,
    freq: trame.freq,
    oilPress: trame.oilPress,
    date: (0, _dateTime.getLocalTime)(trame.date),
    //trame.date,
    createdAt: trame.createdAt,
    idModule: trame.idModule
  };
};
exports.getTrameDTO = getTrameDTO;
var getTrameResponseDTO = function getTrameResponseDTO(trames, page, limit, count) {
  return {
    data: trames.map(getTrameDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getTrameResponseDTO = getTrameResponseDTO;
var getTrameByIdResponseDTO = function getTrameByIdResponseDTO(trame) {
  return {
    data: getTrameDTO(trame)
  };
};
exports.getTrameByIdResponseDTO = getTrameByIdResponseDTO;
var getCreateTrameResponseDTO = function getCreateTrameResponseDTO(trame) {
  return {
    message: 'Success create trame',
    id: trame._id
  };
};
exports.getCreateTrameResponseDTO = getCreateTrameResponseDTO;
var getDeleteTrameResponseDTO = function getDeleteTrameResponseDTO(trame) {
  return {
    message: 'Success delete trame',
    id: trame._id
  };
};
exports.getDeleteTrameResponseDTO = getDeleteTrameResponseDTO;
var getUpdateTrameResponseDTO = function getUpdateTrameResponseDTO(trame) {
  return {
    message: 'Success update trame',
    id: trame._id,
    temp: trame.temp,
    fuel: trame.fuel,
    bat: trame.bat,
    ph1: trame.ph1,
    ph2: trame.ph2,
    ph3: trame.ph3,
    freq: trame.freq,
    oilPress: trame.oilPress,
    date: (0, _dateTime.getLocalTime)(trame.date),
    createdAt: trame.createdAt,
    idModule: trame.idModule
  };
};
exports.getUpdateTrameResponseDTO = getUpdateTrameResponseDTO;