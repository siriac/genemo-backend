import { getPaginationInfo } from '../lib/util';

export const getStandByDTO = (standBy) => ({
  id: standBy._id,
  idModule: standBy.idModule,
  date_debut:standBy.date_debut,
  date_fin:standBy.date_fin,
  infos:standBy.infos

  
});

export const getStandByResponseDTO = (standBys, page, limit, count) => ({
  data: standBys.map(getStandByDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getStandByByIdResponseDTO = (standBy) => ({
  data: getStandByDTO(standBy),
});

export const getCreateStandByResponseDTO = (standBy) => ({
  message: 'standBy crée avec succés',
  id: standBy._id,
  idModule: standBy.idModule,
  date_debut:standBy.date_debut,
  date_fin:standBy.date_fin,
  infos:standBy.infos
});

export const getDeleteStandByResponseDTO = (standBy) => ({
  message: 'standBy supprimé avec succés',
  id: standBy._id,
});

export const getUpdateStandByResponseDTO = (standBy) => ({
  message: 'standBy mis à jour avec succés',
  id: standBy._id,
  idModule: standBy.idModule,
  date_debut:standBy.date_debut,
  date_fin:standBy.date_fin,
  infos:standBy.infos
});
