"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateActivitieResponseDTO = exports.getDeleteActivitieResponseDTO = exports.getCreateActivitieResponseDTO = exports.getActivitiesResponseDTO = exports.getActivitieDTO = exports.getActivitieByIdResponseDTO = void 0;
var _util = require("../lib/util");
var getActivitieDTO = function getActivitieDTO(activity) {
  return {
    id: activity._id,
    idModule: activity.idModule,
    date_demarrage: activity.date_demarrage,
    date_arret: activity.date_arret,
    createdAt: activity.createdAt,
    duration: activity.duration
  };
};
exports.getActivitieDTO = getActivitieDTO;
var getActivitiesResponseDTO = function getActivitiesResponseDTO(activitiesDuration, page, limit, count) {
  return {
    activitiesDuration: activitiesDuration.map(getActivitieDTO),
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
    date_demarrage: activitieDuration.date_demarrage,
    date_arret: activitieDuration.date_arret,
    createdAt: activitieDuration.createdAt,
    duration: activity.duration
  };
};
exports.getCreateActivitieResponseDTO = getCreateActivitieResponseDTO;
var getDeleteActivitieResponseDTO = function getDeleteActivitieResponseDTO(activitieDuration) {
  return {
    message: 'Activitie supprimé avec succés',
    id: activitieDuration._id,
    idModule: activitieDuration.idModule,
    date_demarrage: activitieDuration.date_demarrage,
    date_arret: activitieDuration.date_arret,
    createdAt: activitieDuration.createdAt,
    duration: activity.duration
  };
};
exports.getDeleteActivitieResponseDTO = getDeleteActivitieResponseDTO;
var getUpdateActivitieResponseDTO = function getUpdateActivitieResponseDTO(activitieDuration) {
  return {
    message: 'activitieDuration  mise à jour avec succés',
    id: activitieDuration._id,
    idModule: activitieDuration.idModule,
    date_demarrage: activitieDuration.date_demarrage,
    date_arret: activitieDuration.date_arret,
    createdAt: activitieDuration.createdAt,
    duration: activity.duration
  };
};
exports.getUpdateActivitieResponseDTO = getUpdateActivitieResponseDTO;