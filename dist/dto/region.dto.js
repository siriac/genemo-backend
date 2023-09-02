"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateRegionResponseDTO = exports.getRegionResponseDTO = exports.getRegionDTO = exports.getRegionByIdResponseDTO = exports.getDeleteRegionResponseDTO = exports.getCreateRegionResponseDTO = void 0;
var _util = require("../lib/util");
var getRegionDTO = function getRegionDTO(region) {
  return {
    id: region._id,
    name: region.name
  };
};
exports.getRegionDTO = getRegionDTO;
var getRegionResponseDTO = function getRegionResponseDTO(regions, page, limit, count) {
  return {
    data: regions.map(getRegionDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getRegionResponseDTO = getRegionResponseDTO;
var getRegionByIdResponseDTO = function getRegionByIdResponseDTO(region) {
  return {
    data: getRegionDTO(region)
  };
};
exports.getRegionByIdResponseDTO = getRegionByIdResponseDTO;
var getCreateRegionResponseDTO = function getCreateRegionResponseDTO(region) {
  return {
    message: 'Success create region',
    id: region._id
  };
};
exports.getCreateRegionResponseDTO = getCreateRegionResponseDTO;
var getDeleteRegionResponseDTO = function getDeleteRegionResponseDTO(region) {
  return {
    message: 'Success delete region',
    id: region._id
  };
};
exports.getDeleteRegionResponseDTO = getDeleteRegionResponseDTO;
var getUpdateRegionResponseDTO = function getUpdateRegionResponseDTO(region) {
  return {
    message: 'Success update region',
    id: region._id,
    name: region.name
  };
};
exports.getUpdateRegionResponseDTO = getUpdateRegionResponseDTO;