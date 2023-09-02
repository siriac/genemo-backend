"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateDataResponseDTO = exports.getDeleteDataResponseDTO = exports.getDataResponseDTO = exports.getDataDTO = exports.getDataByIdResponseDTO = exports.getCreateDataResponseDTO = void 0;
var _util = require("../lib/util");
var getDataDTO = function getDataDTO(data) {
  return {
    id: data._id,
    idModule: data.idModule,
    date_debut: data.date_debut,
    date_fin: data.date_fin,
    infos: data.infos,
    createdAt: data.createdAt
  };
};
exports.getDataDTO = getDataDTO;
var getDataResponseDTO = function getDataResponseDTO(datas, page, limit, count) {
  return {
    data: datas.map(getDataDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getDataResponseDTO = getDataResponseDTO;
var getDataByIdResponseDTO = function getDataByIdResponseDTO(data) {
  return {
    data: getDataDTO(data)
  };
};
exports.getDataByIdResponseDTO = getDataByIdResponseDTO;
var getCreateDataResponseDTO = function getCreateDataResponseDTO(data) {
  return {
    message: 'Data crée avec succés',
    id: data._id,
    idModule: data.idModule,
    date_debut: data.date_debut,
    date_fin: data.date_fin,
    infos: data.infos,
    createdAt: data.createdAt
  };
};
exports.getCreateDataResponseDTO = getCreateDataResponseDTO;
var getDeleteDataResponseDTO = function getDeleteDataResponseDTO(data) {
  return {
    message: 'Data supprimé avec succés',
    id: data._id,
    idModule: data.idModule,
    date_debut: data.date_debut,
    date_fin: data.date_fin,
    infos: data.infos,
    createdAt: data.createdAt
  };
};
exports.getDeleteDataResponseDTO = getDeleteDataResponseDTO;
var getUpdateDataResponseDTO = function getUpdateDataResponseDTO(data) {
  return {
    message: 'Data mise à jour avec succés',
    id: data._id,
    idModule: data.idModule,
    temperature: data.temperature,
    fuel: data.fuel,
    frequence: data.frequence,
    pression_huile: data.pression_huile,
    duree_fonctionnement: data.duree_fonctionnement,
    date: data.date
  };
};
exports.getUpdateDataResponseDTO = getUpdateDataResponseDTO;