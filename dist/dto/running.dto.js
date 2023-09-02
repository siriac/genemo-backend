"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateRunningResponseDTO = exports.getRunningResponseDTO = exports.getRunningDTO = exports.getRunningByIdResponseDTO = exports.getDeleteRunningResponseDTO = exports.getCreateRunningResponseDTO = void 0;
var _util = require("../lib/util");
var getRunningDTO = function getRunningDTO(running) {
  return {
    id: running._id,
    idModule: running.idModule,
    temperature: running.temperature,
    created: running.created,
    fuel: running.fuel,
    frequence: running.frequence,
    pression_huile: running.pression_huile,
    phase1: running === null || running === void 0 ? void 0 : running.phase1,
    phase2: running.phase2,
    duree: running.duree
  };
};
exports.getRunningDTO = getRunningDTO;
var getRunningResponseDTO = function getRunningResponseDTO(runnings, page, limit, count) {
  return {
    data: runnings.map(getRunningDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getRunningResponseDTO = getRunningResponseDTO;
var getRunningByIdResponseDTO = function getRunningByIdResponseDTO(running) {
  return {
    data: getRunningDTO(running)
  };
};
exports.getRunningByIdResponseDTO = getRunningByIdResponseDTO;
var getCreateRunningResponseDTO = function getCreateRunningResponseDTO(running) {
  return {
    message: 'running crée avec succés',
    id: running._id,
    idModule: running.idModule,
    temperature: running.temperature,
    created: running.created,
    fuel: running.fuel,
    frequence: running.frequence,
    pression_huile: running.pression_huile,
    phase1: running === null || running === void 0 ? void 0 : running.phase1,
    phase2: running.phase2,
    duree: running.duree
  };
};
exports.getCreateRunningResponseDTO = getCreateRunningResponseDTO;
var getDeleteRunningResponseDTO = function getDeleteRunningResponseDTO(running) {
  return {
    message: 'Running supprimé avec succés',
    id: running._id
  };
};
exports.getDeleteRunningResponseDTO = getDeleteRunningResponseDTO;
var getUpdateRunningResponseDTO = function getUpdateRunningResponseDTO(running) {
  return {
    message: 'Running mis à jour avec succés',
    id: running._id,
    idModule: running.idModule,
    temperature: running.temperature,
    created: running.created,
    fuel: running.fuel,
    frequence: running.frequence,
    pression_huile: running.pression_huile,
    phase1: running === null || running === void 0 ? void 0 : running.phase1,
    phase2: running.phase2,
    duree: running.duree
  };
};
exports.getUpdateRunningResponseDTO = getUpdateRunningResponseDTO;