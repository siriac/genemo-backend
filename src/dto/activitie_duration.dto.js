import { getPaginationInfo } from '../lib/util';

export const getActivitieDTO = (activity) => ({
  id: activity._id,
  idModule: activity.idModule,
  date_demarrage:activity.date_demarrage,
  date_arret:activity.date_arret,
  createdAt:activity.createdAt,
  duration:activity.duration
});

export const getActivitiesResponseDTO = (activitiesDuration, page, limit, count) => ({
  activitiesDuration: activitiesDuration.map(getActivitieDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getActivitieByIdResponseDTO = (activitieDuration) => ({
  activitie: getActivitieDTO(activitieDuration),
});

export const getCreateActivitieResponseDTO = (activitieDuration) => ({
  message: 'Activitie crée avec succés',
  id: activitieDuration._id,
  idModule:activitieDuration.idModule,
  date_demarrage:activitieDuration.date_demarrage,
  date_arret:activitieDuration.date_arret,
  createdAt:activitieDuration.createdAt,
  duration:activity.duration

});

export const getDeleteActivitieResponseDTO = (activitieDuration) => ({
  message: 'Activitie supprimé avec succés',
  id: activitieDuration._id,
  idModule:activitieDuration.idModule,
  date_demarrage:activitieDuration.date_demarrage,
  date_arret:activitieDuration.date_arret,
  createdAt:activitieDuration.createdAt,
  duration:activity.duration
});

export const getUpdateActivitieResponseDTO = (activitieDuration) => ({
  message: 'activitieDuration  mise à jour avec succés',
  id: activitieDuration._id,
  idModule:activitieDuration.idModule,
  date_demarrage:activitieDuration.date_demarrage,
  date_arret:activitieDuration.date_arret,
  createdAt:activitieDuration.createdAt,
  duration:activity.duration
});
