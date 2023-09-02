"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateActivitieResponseDTO = exports.getDeleteActivitieResponseDTO = exports.getCreateActivitieResponseDTO = exports.getActivitiesResponseDTO = exports.getActivitieDTO = exports.getActivitieByIdResponseDTO = void 0;
var _util = require("../lib/util");
var getActivitieDTO = function getActivitieDTO(data) {
  return {
    id: data._id,
    idModule: data.idModule,
    date: data.date,
    activities: data.activities,
    createdAt: data.createdAt
  };
};
exports.getActivitieDTO = getActivitieDTO;
var getActivitiesResponseDTO = function getActivitiesResponseDTO(activitiesDuration, page, limit, count) {
  return {
    activitiesDuration: activitiesDuration.map(getActivitiesDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getActivitiesResponseDTO = getActivitiesResponseDTO;
var getActivitieByIdResponseDTO = function getActivitieByIdResponseDTO(activitieDuration) {
  return {
    activitie: getActivitieDTO(activitieDuration)
  };
};
exports.getActivitieByIdResponseDTO = getActivitieByIdResponseDTO;
var getCreateActivitieResponseDTO = function getCreateActivitieResponseDTO(activitieDuration) {
  return {
    message: 'Activitie crée avec succés',
    id: activitieDuration._id,
    idModule: activitieDuration.idModule,
    date: activitieDuration.date,
    activities: activitieDuration.activities,
    createdAt: activitieDuration.createdAt
  };
};
exports.getCreateActivitieResponseDTO = getCreateActivitieResponseDTO;
var getDeleteActivitieResponseDTO = function getDeleteActivitieResponseDTO(activitieDuration) {
  return {
    message: 'Activitie supprimé avec succés',
    id: activitieDuration._id,
    idModule: activitieDuration.idModule,
    date: activitieDuration.date,
    activitie: activitieDuration.activities,
    createdAt: activitieDuration.createdAt
  };
};
exports.getDeleteActivitieResponseDTO = getDeleteActivitieResponseDTO;
var getUpdateActivitieResponseDTO = function getUpdateActivitieResponseDTO(activitieDuration) {
  return {
    message: 'activitieDuration  mise à jour avec succés',
    id: activitieDuration._id,
    idModule: activitieDuration.idModule,
    activities: activitieDuration.activities,
    date: data.date
  };
};
exports.getUpdateActivitieResponseDTO = getUpdateActivitieResponseDTO;