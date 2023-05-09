import { getPaginationInfo } from '../lib/util';

export const getImeiDTO = (imei) => ({
  id: imei._id,
  imei: imei.imei,
  isBusy: imei.isBusy,
  enabled:imei.enabled
});

export const getImeiResponseDTO = (imeis, page, limit, count) => ({
  data: imeis.map(getImeiDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getImeiByIdResponseDTO = (imei) => ({
  data: getImeiDTO(imei),
});

export const getCreateImeiResponseDTO = (imei) => ({
  message: 'Imei crée avec succés',
  id: imei._id,
  isBusy:imei.isBusy,
  enabled:imei.enabled

});

export const getDeleteImeiResponseDTO = (imei) => ({
  message: 'Imei supprimé avec succés',
  id: imei._id,
});

export const getUpdateImeiResponseDTO = (imei) => ({
  message: 'Imei mise à jour avec succés',
  id: imei._id,
  imei: imei.imei,
  created: imei.created,
  isBusy:imei.isBusy
});
