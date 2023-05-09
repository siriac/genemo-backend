import { getPaginationInfo } from '../lib/util';

export const getActivitieDTO = (data) => ({
  id: data._id,
  idModule: data.idModule,
  date:data.date,
  activities:data.activities,
  createdAt:data.createdAt
});

export const getActivitiesResponseDTO = (activitiesDuration, page, limit, count) => ({
  activitiesDuration: activitiesDuration.map(getActivitiesDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getActivitieByIdResponseDTO = (activitieDuration) => ({
  activitie: getActivitieDTO(activitieDuration),
});

export const getCreateActivitieResponseDTO = (activitieDuration) => ({
  message: 'Activitie crée avec succés',
  id: activitieDuration._id,
  idModule:activitieDuration.idModule,
  date:activitieDuration.date,
  activities:activitieDuration.activities,
  createdAt:activitieDuration.createdAt

});

export const getDeleteActivitieResponseDTO = (activitieDuration) => ({
  message: 'Activitie supprimé avec succés',
  id: activitieDuration._id,
  idModule:activitieDuration.idModule,
  date:activitieDuration.date,
  activitie:activitieDuration.activities,
  createdAt:activitieDuration.createdAt
});

export const getUpdateActivitieResponseDTO = (activitieDuration) => ({
  message: 'activitieDuration  mise à jour avec succés',
  id: activitieDuration._id,
  idModule: activitieDuration.idModule,
  activities:activitieDuration.activities,
  date:data.date
});
