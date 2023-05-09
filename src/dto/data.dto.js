import { getPaginationInfo } from '../lib/util';

export const getDataDTO = (data) => ({
  id: data._id,
  idModule: data.idModule,
  date_debut:data.date_debut,
  date_fin:data.date_fin,
  infos:data.infos,
  createdAt:data.createdAt
});

export const getDataResponseDTO = (datas, page, limit, count) => ({
  data: datas.map(getDataDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getDataByIdResponseDTO = (data) => ({
  data: getDataDTO(data),
});

export const getCreateDataResponseDTO = (data) => ({
  message: 'Data crée avec succés',
  id: data._id,
  idModule:data.idModule,
  date_debut:data.date_debut,
  date_fin:data.date_fin,
  infos:data.infos,
  createdAt:data.createdAt

});

export const getDeleteDataResponseDTO = (data) => ({
  message: 'Data supprimé avec succés',
  id: data._id,
  idModule:data.idModule,
  date_debut:data.date_debut,
  date_fin:data.date_fin,
  infos:data.infos,
  createdAt:data.createdAt
});

export const getUpdateDataResponseDTO = (data) => ({
  message: 'Data mise à jour avec succés',
  id: data._id,
  idModule: data.idModule,
  temperature: data.temperature,
  fuel:data.fuel,
  frequence:data.frequence,
  pression_huile:data.pression_huile,
  duree_fonctionnement:data.duree_fonctionnement,
  date:data.date
});
