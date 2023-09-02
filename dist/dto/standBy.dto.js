"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateStandByResponseDTO = exports.getStandByResponseDTO = exports.getStandByDTO = exports.getStandByByIdResponseDTO = exports.getDeleteStandByResponseDTO = exports.getCreateStandByResponseDTO = void 0;
var _util = require("../lib/util");
var getStandByDTO = function getStandByDTO(standBy) {
  return {
    id: standBy._id,
    idModule: standBy.idModule,
    date_debut: standBy.date_debut,
    date_fin: standBy.date_fin,
    infos: standBy.infos
  };
};
exports.getStandByDTO = getStandByDTO;
var getStandByResponseDTO = function getStandByResponseDTO(standBys, page, limit, count) {
  return {
    data: standBys.map(getStandByDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getStandByResponseDTO = getStandByResponseDTO;
var getStandByByIdResponseDTO = function getStandByByIdResponseDTO(standBy) {
  return {
    data: getStandByDTO(standBy)
  };
};
exports.getStandByByIdResponseDTO = getStandByByIdResponseDTO;
var getCreateStandByResponseDTO = function getCreateStandByResponseDTO(standBy) {
  return {
    message: 'standBy crée avec succés',
    id: standBy._id,
    idModule: standBy.idModule,
    date_debut: standBy.date_debut,
    date_fin: standBy.date_fin,
    infos: standBy.infos
  };
};
exports.getCreateStandByResponseDTO = getCreateStandByResponseDTO;
var getDeleteStandByResponseDTO = function getDeleteStandByResponseDTO(standBy) {
  return {
    message: 'standBy supprimé avec succés',
    id: standBy._id
  };
};
exports.getDeleteStandByResponseDTO = getDeleteStandByResponseDTO;
var getUpdateStandByResponseDTO = function getUpdateStandByResponseDTO(standBy) {
  return {
    message: 'standBy mis à jour avec succés',
    id: standBy._id,
    idModule: standBy.idModule,
    date_debut: standBy.date_debut,
    date_fin: standBy.date_fin,
    infos: standBy.infos
  };
};
exports.getUpdateStandByResponseDTO = getUpdateStandByResponseDTO;