import { getPaginationInfo } from '../lib/util';

export const getRunningDTO = (running) => ({
  id: running._id,
  idModule: running.idModule,
  temperature:running.temperature,
  created:running.created,
  fuel:running.fuel,
  frequence:running.frequence,
  pression_huile:running.pression_huile,
  phase1:running?.phase1,
  phase2:running.phase2,
  duree:running.duree

  
});

export const getRunningResponseDTO = (runnings, page, limit, count) => ({
  data: runnings.map(getRunningDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getRunningByIdResponseDTO = (running) => ({
  data: getRunningDTO(running),
});

export const getCreateRunningResponseDTO = (running) => ({
  message: 'running crée avec succés',
  id: running._id,
  idModule: running.idModule,
  temperature:running.temperature,
  created:running.created,
  fuel:running.fuel,
  frequence:running.frequence,
  pression_huile:running.pression_huile,
  phase1:running?.phase1,
  phase2:running.phase2,
  duree:running.duree
});

export const getDeleteRunningResponseDTO = (running) => ({
  message: 'Running supprimé avec succés',
  id: running._id,
});

export const getUpdateRunningResponseDTO = (running) => ({
  message: 'Running mis à jour avec succés',
  id: running._id,
  idModule: running.idModule,
  temperature:running.temperature,
  created:running.created,
  fuel:running.fuel,
  frequence:running.frequence,
  pression_huile:running.pression_huile,
  phase1:running?.phase1,
  phase2:running.phase2,
  duree:running.duree
});
