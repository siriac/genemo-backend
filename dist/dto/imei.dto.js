"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateImeiResponseDTO = exports.getImeiResponseDTO = exports.getImeiDTO = exports.getImeiByIdResponseDTO = exports.getDeleteImeiResponseDTO = exports.getCreateImeiResponseDTO = void 0;
var _util = require("../lib/util");
var getImeiDTO = function getImeiDTO(imei) {
  return {
    id: imei._id,
    imei: imei.imei,
    isBusy: imei.isBusy,
    enabled: imei.enabled
  };
};
exports.getImeiDTO = getImeiDTO;
var getImeiResponseDTO = function getImeiResponseDTO(imeis, page, limit, count) {
  return {
    data: imeis.map(getImeiDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getImeiResponseDTO = getImeiResponseDTO;
var getImeiByIdResponseDTO = function getImeiByIdResponseDTO(imei) {
  return {
    data: getImeiDTO(imei)
  };
};
exports.getImeiByIdResponseDTO = getImeiByIdResponseDTO;
var getCreateImeiResponseDTO = function getCreateImeiResponseDTO(imei) {
  return {
    message: 'Imei crée avec succés',
    id: imei._id,
    isBusy: imei.isBusy,
    enabled: imei.enabled
  };
};
exports.getCreateImeiResponseDTO = getCreateImeiResponseDTO;
var getDeleteImeiResponseDTO = function getDeleteImeiResponseDTO(imei) {
  return {
    message: 'Imei supprimé avec succés',
    id: imei._id
  };
};
exports.getDeleteImeiResponseDTO = getDeleteImeiResponseDTO;
var getUpdateImeiResponseDTO = function getUpdateImeiResponseDTO(imei) {
  return {
    message: 'Imei mise à jour avec succés',
    id: imei._id,
    imei: imei.imei,
    created: imei.created,
    isBusy: imei.isBusy
  };
};
exports.getUpdateImeiResponseDTO = getUpdateImeiResponseDTO;