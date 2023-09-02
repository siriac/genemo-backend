"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVidangeResponseDTO = exports.getVidangeDTO = exports.getVidangeByIdResponseDTO = exports.getUpdateVidangeResponseDTO = exports.getDeleteVidangeResponseDTO = exports.getCreateVidangeResponseDTO = void 0;
var _util = require("../lib/util");
var _dateTime = require("../lib/dateTime");
var getVidangeDTO = function getVidangeDTO(vidange) {
  return {
    id: vidange._id,
    remarque: vidange.remarque,
    date: (0, _dateTime.getLocalTime)(vidange.date),
    createdAt: vidange.createdAt,
    idModule: vidange.idModule,
    doBy: vidange.doBy
  };
};
exports.getVidangeDTO = getVidangeDTO;
var getVidangeResponseDTO = function getVidangeResponseDTO(vidanges, page, limit, count) {
  return {
    data: vidanges.map(getVidangeDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getVidangeResponseDTO = getVidangeResponseDTO;
var getVidangeByIdResponseDTO = function getVidangeByIdResponseDTO(vidange) {
  return {
    data: getVidangeDTO(vidange)
  };
};
exports.getVidangeByIdResponseDTO = getVidangeByIdResponseDTO;
var getCreateVidangeResponseDTO = function getCreateVidangeResponseDTO(vidange) {
  return {
    message: 'Success create vidange',
    id: vidange._id
  };
};
exports.getCreateVidangeResponseDTO = getCreateVidangeResponseDTO;
var getDeleteVidangeResponseDTO = function getDeleteVidangeResponseDTO(vidange) {
  return {
    message: 'Success delete vidange',
    id: trame._id
  };
};
exports.getDeleteVidangeResponseDTO = getDeleteVidangeResponseDTO;
var getUpdateVidangeResponseDTO = function getUpdateVidangeResponseDTO(vidange) {
  return {
    message: 'Success update vidange',
    id: vidange._id,
    remarque: vidange.remarque,
    date: vidange.date,
    createdAt: vidange.createdAt,
    idModule: vidange.idModule
  };
};
exports.getUpdateVidangeResponseDTO = getUpdateVidangeResponseDTO;